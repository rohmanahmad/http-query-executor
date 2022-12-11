'use strict'

const home = async function home(request, response) {
    const { version, last_restart, author } = this.config.app.server
    console.log(this.providers)
    response.json({
        version,
        last_restart,
        author
    })
}

const homeRouteController = {
    name: 'home',
    path: '/',
    method: 'GET',
    middlewares: ['auth'],
    controller: home
}

module.exports = homeRouteController