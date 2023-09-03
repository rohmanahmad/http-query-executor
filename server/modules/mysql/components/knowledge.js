'use strict'

const controller = async function controller(request, response) {
    const { version, last_restart, author } = this.config.app.server
    response.json({
        Info: true
    })
}

const routeController = {
    name: 'Info',
    path: '/info',
    method: 'GET',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['MySQL(General)'],
        summary: 'MySQL (Info)',
        description: 'Info of MySQL',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [],
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