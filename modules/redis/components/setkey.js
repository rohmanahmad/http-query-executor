'use strict'

const execute = async function execute(request, response, next) {
    try {
        let { key, value, expired=10 } = request.body
        if (!key || !value) throw new Error('Invalid Key Or Value')
        if (typeof value !== 'string') throw new Error('Value Should be a String')
        if (typeof expired !== 'number') throw new Error('Invalid Expired Value')
        await this.providers.redis.set(key, value, { EX: expired })
        response.json({ status: true })
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