'use strict'

const execute = async function execute(request, response, next) {
    try {
        const { key } = request.query
        const data = await this.providers.redis.del(key)
        response.json(data)
    } catch (err) {
        next(err)
    }
}

const delkeyRouteController = {
    name: 'delkey',
    path: '/delkey', // action > see "availableActions" var
    method: 'POST',
    middlewares: ['auth'],
    controller: execute
}

module.exports = delkeyRouteController