'use strict'

const requireAll = require('require-all')
const http = require('http')
const express = require('express')
const compression = require('compression')
const getResult = require('lodash.result')
const { join, resolve } = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const { createTerminus } = require('@godaddy/terminus')
const responseExtend = require('./response')

const acceptedProviders = require(resolve('configs/providers')).components
const providers = requireAll({
    dirname: resolve('core/providers'),
    recursive: false,
    // filter: /(.*).js$/
    filter: (filename) => {
        const fN = filename.replace('.js', '')
        const x = acceptedProviders.indexOf(fN) > -1
        return x ? fN : false
    }
})
const routes = require('./routes')
const helpers = requireAll({
    dirname: resolve('core/helpers'),
    recursive: true,
    filter: /(.*)\.js$/,
    map: (name) => {
        return name
    }
})
const { logInfo, logError } = helpers.logger
const app = express()
app.use('/public', express.static('statics'))

class Server {
    contructor({ host, port }) {
        this.host = host
        this.port = parseInt(port)
        this.helpers = helpers
    }

    // SETTER
    setConfig(config = {}) {
        this.config = config
        return this
    }
    // END OF SETTER

    // GETTER
    getAllMiddlewares() {
        const allMiddlewares = getResult(this.config, 'app.middlewares', {})
        return allMiddlewares
    }
    getGlobalMiddlewares() {
        const allMiddlewares = this.getAllMiddlewares()
        const globalMiddlewares = getResult(this.config, 'app.global_middlewares', [])
        if (globalMiddlewares.length > 0)
            return globalMiddlewares
                .map(x => allMiddlewares[x])
                .filter(x => x)
                .map(x => x.bind(this))
        return []
    }
    getRouteMiddlewares(namedMiddlewares = []) { // string array
        const allMiddlewares = this.getAllMiddlewares()
        const middlewares = namedMiddlewares
            .map(x => allMiddlewares[x])
            .filter(x => x)
            .map(x => x.bind(this))
        return middlewares
    }
    // END OF GETTER

    async routes() {
        try {
            app.disable('x-powered-by')
            app.use(helmet())
            app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            await this.registerProviders()
            if (this.config.app.node_env === 'production') app.use(compression()) // best practice for performance
            for (const routeGroup in routes) {
                const group = routes[routeGroup]
                const groupName = getResult(group, 'routes.name', '-')
                const routePrefix = getResult(group, 'routes.prefix', '-')
                const routeList = getResult(group, 'routes.list', [])
                if (routeList.length === 0) continue;
                for (const route of routeList) {
                    const method = route.method || 'GET' // default route is GET
                    const routeName = [route.method.toLowerCase(), groupName, route.name].join('_').replace('-', '_')
                    const middlewares = [
                        ...this.getGlobalMiddlewares(),
                        ...this.getRouteMiddlewares(route.middlewares)
                    ]
                    this.registerRoute({
                        name: routeName,
                        group_name: groupName,
                        method,
                        path: join(routePrefix, route.path),
                        middlewares,
                        controller: route.controller
                    })
                }
            }
            // registering route not-found
            this.registerRoute({
                name: 'any_not_found',
                group_name: 'not_found',
                method: 'all',
                path: '*',
                middlewares: [],
                controller: function (request, response) {
                    response.json({
                        status: 404,
                        method: request.method,
                        message: 'HTTP URL Not Found'
                    })
                }
            })
            app.use(this.handleError.bind(this)) // handling error
        } catch (err) {
            throw err
        }
    }

    async registerProviders() {
        try {
            this.providerInstance = {}
            this.providers = {}
            for (const pName in providers) {
                logInfo(`Registering Provider (${pName})`)
                const Provider = providers[pName]
                const p = new Provider(this.config.providers[pName])
                if (!p.boot) throw new Error(`In (${pName}) Provider required "boot" function.`)
                if (!p.close) throw new Error(`In (${pName}) Provider required "close" function.`)
                this.providers[pName] = await p.boot()
                this.providerInstance[pName] = p // digunakan hanya ketika server closing / exiting / sigterm (untuk panggil "close")
            }
            return true
        } catch (err) {
            throw err
        }
    }

    registerRoute({ name, method, path, middlewares, controller }) {
        method = method.toLowerCase()
        logInfo('Registering Route', name, `[${method.toUpperCase()}]`, path)
        let r = app[method]
        if (typeof app[method] !== 'function') throw new Error(`Invalid method [${method.toUpperCase()}] from route "${name}"!`)
        app[method](path, middlewares, controller.bind(this))
    }

    async start() {
        try {
            logInfo(`Starting ${this.config.app.node_env} Server`)
            let host = this.host,
                port = this.port
            if (!host) host = getResult(this.config, 'app.server.host', '127.0.0.1')
            if (!port) port = parseInt(getResult(this.config, 'app.server.port', 3000))
            await this.routes()
            this.overideResponse()
            const server = http.createServer(app)
            const instance = server.listen(port, host, () => {
                logInfo(`Server Listen on http://${host}:${port}`)
            })
            this.listenSignal(instance)
        } catch (err) {
            console.error(err)
            process.exit(0)
        }
    }
    overideResponse() {
        responseExtend(app)
    }
    listenSignal(instance) {
        process.on('SIGINT', () => {
            logInfo('SIGINT signal received: closing HTTP server')
            instance.close(async () => {
                logInfo('HTTP server closed')
                await this.closingProviders()
            })
        })
        createTerminus(instance, {
            signal: 'SIGINT',
            healthChecks: { '/health/status': this.healthCheck },
            onSignal: this.onSignal
        })
    }
    async onSignal() {
        logInfo('Server Shutting Down...')
        await this.closingProviders()
        return true
    }
    async closingProviders() {
        for (const pName in this.providerInstance) {
            const p = this.providerInstance[pName]
            logInfo(`Closing Connection on (${pName})`)
            await p.close()
        }
        return true
    }
    async healthCheck({ state }) {
        return state
    }
    handleError(error, request, response, next) {
        const
            statusCode=500,
            message = error && error.message ? error.message : 'Server Error'
        if (!response.headerSent) {
            response
                .status(statusCode)
                .json({
                    path: request.path,
                    method: request.method,
                    status: statusCode,
                    message,
                })
        }
        if (error) logError(error)
    }
}

module.exports = Server