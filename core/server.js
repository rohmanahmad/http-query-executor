'use strict'

const requireAll = require('require-all')
const http = require("http")
const express = require('express')
const compression = require('compression')
const getResult = require('lodash.result')
const { join } = require('path')
const bodyParser = require('body-parser')
const { createTerminus } = require('@godaddy/terminus')
const responseExtend = require('./response')
const providers = requireAll({
    dirname: __dirname + '/providers',
    recursive: false,
    filter: /(.*).js$/
})
const routes = require('./routes')
const helpers = requireAll({
    dirname: __dirname + '/helpers',
    recursive: true,
    filter: /(.*)\.js$/,
    map: (name) => {
        return name
    }
})
const { logInfo } = helpers.logger
const app = express()

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
        if (globalMiddlewares.length > 0) return globalMiddlewares.map(x => allMiddlewares[x]).filter(x => x).map(x => x.bind(this))
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
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: false }))
        await this.registerProviders()
        if (this.config.app.node_env === 'production') app.use(compression()) // best practice for performance
        for (const routeGroup in routes) {
            const group = routes[routeGroup]
            const groupName = getResult(group, 'routes.name', '-')
            const routePrefix = getResult(group, 'routes.prefix', '-')
            const routeList = getResult(group, 'routes.list', [])
            if (routeList.length === 0) continue;
            for (const route of routeList) {
                const routeName = [groupName, route.name].join('_').replace('-', '_')
                const middlewares = [
                    ...this.getGlobalMiddlewares(),
                    ...this.getRouteMiddlewares(route.middlewares)
                ]
                this.registerRoute({
                    name: routeName,
                    group_name: groupName,
                    method: route.method || 'GET', // default route is GET
                    path: join(routePrefix, route.path, '/'),
                    middlewares,
                    controller: route.controller
                })
            }
        }
    }

    async registerProviders() {
        try {
            this.providerInstance = {}
            this.providers = {}
            for (const pName in providers) {
                const Provider = providers[pName]
                const p = new Provider(this.config.providers[pName])
                if (!p.boot) throw new Error(`In (${pName}) Provider required "boot" function.`)
                if (!p.close) throw new Error(`In (${pName}) Provider required "close" function.`)
                this.providers[pName] = await p.boot()
                this.providerInstance[pName] = p // digunakan hanya ketika server closing / exiting / sigterm (untuk panggil "close")
            }
        } catch (err) {
            throw err
        }
    }

    registerRoute({ name, method, path, middlewares, controller }) {
        method = method.toLowerCase()
        logInfo('registering route', name, `[${method.toUpperCase()}]`, path)
        let r = app[method]
        if (typeof app[method] !== 'function') throw new Error(`invalid method [${method.toUpperCase()}] from route "${name}"!`)
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
}

module.exports = Server