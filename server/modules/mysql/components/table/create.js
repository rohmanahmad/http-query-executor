'use strict'

const controller = async function (request, response, next) {
    try {
        const body = request.body
        const pool = await this.providers.mysql.pool
        const queryString = []
        queryString.push(`CREATE TABLE IF NOT EXISTS ${body.table_name}`)
        response.json({ status: true })
    } catch (err) {
        next(err)
    }
}

const routeController = {
    name: 'tableCreate',
    path: '/table/create',
    method: 'POST',
    middlewares: ['auth'],
    controller,
    swagger: {
        tags: ['MySQL(Table)'],
        summary: 'MySQL Table (Create)',
        description: 'Create tables of MySQL Storage',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
            // 'body.table_create'
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
            }
        },
    }
}

module.exports = routeController