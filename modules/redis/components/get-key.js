'use strict'

const execute = async function execute(request, response, next) {
    try {
        const key = request.query.key
        if (!key) throw new Error('Invalid Key')
        const data = await this.providers.redis.get(key)
        response.json({[key]: data})
    } catch (err) {
        next(err)
    }
}

const getkeyRouteController = {
    name: 'getkey',
    path: '/get-key', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller: execute,
    swagger: {
        tags: ['Redis'],
        summary: 'Redis (get)',
        description: 'Get Key From Redis Storage',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: ['query.key'],
        requires: {
            'query.key': true
        },
        responses: {
            '200': {
                description: 'Success Retrieve',
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

module.exports = getkeyRouteController