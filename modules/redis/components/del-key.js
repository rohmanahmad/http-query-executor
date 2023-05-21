'use strict'

const controller = async function controller(request, response, next) {
    try {
        const { key: k } = request.query
        await this.providers.redis.del(k)
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'delkey',
    path: '/delkey', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['Redis(Operation)'],
        summary: 'Redis (delete)',
        description: 'Delete Key From Redis Storage',
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
                description: 'Success Delete',
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