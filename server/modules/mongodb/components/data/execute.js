'use strict'

const availableActions = {
}

const validateAction = function (action, sql) {
    const aC = Object.keys(availableActions)
    if (aC.indexOf(action) === -1) throw new Error('Invalid Action! Available Actions Are: [' + aC.join('|') + ']')
    const prefix = availableActions[action]
    if (sql.indexOf(prefix) !== 0) throw new Error('SQL Doesnt Match With Action!') // jika sql tidak sesuai dengan ketentuan maka tertolak
    return true
}

const execute = async function execute(request, response, next) {
    try {
        response.json({status: 200})
    } catch (err) {
        next(err)
    }
}

const executeRouteController = {
    name: 'execute',
    path: '/data/:collection/execute/:action', // action > see "availableActions" var
    method: 'POST',
    middlewares: ['auth'],
    controller: execute,
    swagger: {
        tags: ['MongoDB(Data)'],
        summary: 'MongoDB (Execute)',
        description: 'Execute data with key',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
            'paths.mongodb_collection',
            // 'paths.action',
            // 'body.sql_execute'
        ],
        enums: {
            // 'paths.action': Object.keys(availableActions)
        },
        defaults: {
            // 'paths.action': 'data-list'
        },
        requires: {
            // 'paths.mongodb_collection': true,
            // 'paths.action': true,
            // 'paths.sql_execute': true,
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

module.exports = executeRouteController