'use strict'

const controller = async function (request, response, next) {
    try {
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'dataUpdate',
    path: '/data/:collection/Update',
    method: 'POST',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['MongoDB(Data Operation)'],
        summary: 'MongoDB data (Update)',
        description: 'Update data of MongoDB Storage',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
          'path.collection',
          'body.update_data',
        ],
        requires: {
            'path.collection': true
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