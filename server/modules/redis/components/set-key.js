'use strict'

const controller = async function controller(request, response, next) {
    try {
        let { key, value, expired=10 } = request.body
        if (!key || !value) throw new Error('Invalid Key Or Value')
        if (typeof value !== 'string') throw new Error('Value Should be a String')
        if (expired) expired = parseInt(expired)
        if (typeof expired !== 'number') throw new Error('Invalid Expired Value')
        await this.providers.redis.set(key, value, { EX: expired })
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'setkey',
    path: '/setkey', // action > see "availableActions" var
    method: 'POST',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['Redis(Operation)'],
        summary: 'Redis (set)',
        description: 'Set Key From Redis Storage',
        consumes: [
            'application/x-www-form-urlencoded'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
            'forms.redis_key',
            'forms.redis_value',
            'forms.redis_expired'
        ],
        requires: {
            'forms.redis_key': true,
            'forms.redis_value': true,
            'forms.redis_expired': true
        },
        responses: {
            '200': {
                description: 'Success',
                schema: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'integer',
                            example: 200
                        },
                        message: {
                            type: 'string',
                            example: 'success'
                        },
                        data: {
                            type: 'any',
                            example: 'any type of object, string, number and other data type'
                        }
                    }
                }
            },
            '500': {
                description: 'Internal Server Error',
                schema: {
                    '$ref': '#/references/components/response_schema/internal_server_error'
                }
            }
        },
    }
}

module.exports = routeController