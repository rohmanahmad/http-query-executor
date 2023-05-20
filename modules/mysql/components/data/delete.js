'use strict'

const controller = async function (request, response, next) {
    try {
        const { key: k } = request.query
        await this.providers.redis.del(k)
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'dataDelete',
    path: '/data/:table_name/delete',
    method: 'POST',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['MySQL'],
        summary: 'MySQL data (Delete)',
        description: 'Delete data of MySQL Storage',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
          'path.table_name',
          'body.delete_data',
        ],
        requires: {
            'path.table_name': true
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