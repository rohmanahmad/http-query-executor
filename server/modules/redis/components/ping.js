'use strict'

const controller = async function controller(request, response, next) {
    try {
        const data = await this.providers.redis.ping()
        response.json(data)
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'ping',
    path: '/ping', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['Redis(General)'],
        summary: 'Redis (ping)',
        description: 'Check Connection From Redis Server',
        consumes: [
            // 'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [],
        responses: {
            '200': {
                description: 'Success Ping',
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