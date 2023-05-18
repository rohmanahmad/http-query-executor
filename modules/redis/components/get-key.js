'use strict'

const execute = async function execute(request, response, next) {
    try {
        const key = request.query.key
        if (!key) throw new Error('Invalid Key')
        const data = await this.providers.redis.get(key)
        response.json(data)
    } catch (err) {
        next(err)
    }
}

const getkeyRouteController = {
    name: 'getkey',
    path: '/getkey', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller: execute
}

module.exports = getkeyRouteController