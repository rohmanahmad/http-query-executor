'use strict'

const controller = async function controller(request, response, next) {
    try {
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'info',
    path: '/info', // action > see "availableActions" var
    method: 'GET',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['Redis(General)'],
        summary: 'Redis (Info)',
        description: 'Information Of Redis Storage',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [],
        requires: {
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