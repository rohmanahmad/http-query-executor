'use strict'

const execute = async function execute(request, response, next) {
    try {
        const { key: k } = request.query
        await this.providers.redis.del(k)
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const delkeyRouteController = {
    name: 'delkey',
    path: '/delkey', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller: execute
}

module.exports = delkeyRouteController