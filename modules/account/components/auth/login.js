'use strict'

const controller = async function (request, response, next) {
    try {
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'authLogin',
    path: '/auth/login',
    method: 'POST',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['Account(Authentication)'],
        summary: 'Account Auth Login',
        description: 'Login Account',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
        ],
        requires: {
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
            },
            '404': {
                description: 'Route Not Found',
                schema: {
                    '$ref': '#/references/components/response_schema/route_not_found'
                }
            }
        },
    }
}

module.exports = routeController