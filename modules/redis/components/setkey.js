'use strict'

const execute = async function execute(request, response, next) {
    try {
        const { key, value, expired=10 } = request.body
        if (!key || !value) throw new Error('Invalid Key Or Value')
        const data = await this.providers.redis.set(key, value, { EX: expired })
        response.json(data)
    } catch (err) {
        next(err)
    }
}

const setkeyRouteController = {
    name: 'setkey',
    path: '/setkey', // action > see "availableActions" var
    method: 'POST',
    middlewares: ['auth'],
    controller: execute
}

module.exports = setkeyRouteController