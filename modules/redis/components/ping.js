'use strict'

const execute = async function execute(request, response, next) {
    try {
        const data = await this.providers.redis.ping()
        response.json(data)
    } catch (err) {
        next(err)
    }
}

const pingRouteController = {
    name: 'ping',
    path: '/ping', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller: execute
}

module.exports = pingRouteController