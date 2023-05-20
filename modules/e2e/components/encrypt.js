'use strict'

const encrypt = async function encrypt(request, response) {
    let { final_key: finalKey, payload, key, mode } = this.input.body
    if (finalKey) finalKey = new Uint8Array(finalKey.split(','))
    const encrypted = this.providers.e2e.encrypt(finalKey, payload, key, mode)
    response.json({ encrypted })
}

const encryptRouteController = {
    name: 'encrypt',
    path: '/encrypt',
    method: 'POST',
    middlewares: ['auth'],
    controller: encrypt,
    swagger: {
        tags: ['Encryption'],
        summary: 'Encryption (Encrypt)',
        description: 'Encrypt data with key',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
            'form.final_key',
            'form.payload',
            'form.key',
            'form.mode',
        ],
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
        }
    }
}

module.exports = encryptRouteController