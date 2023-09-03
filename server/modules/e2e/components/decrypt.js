'use strict'

const decrypt = async function decrypt(request, response) {
    let { final_key: finalKey, payload, key, mode } = this.input.body
    if (finalKey) finalKey = new Uint8Array(finalKey.split(','))
    const decrypted = this.providers.e2e.decrypt(finalKey, payload, key, mode)
    response.json({decrypted})
}

const decryptRouteController = {
    name: 'decrypt',
    path: '/decrypt',
    method: 'POST',
    middlewares: ['auth'],
    controller: decrypt,
    swagger: {
        tags: ['Encryption'],
        summary: 'Encryption (decrypt)',
        description: 'decrypt data with key',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
            'forms.enc_final_key',
            'forms.enc_payload',
            'forms.enc_key',
            'forms.enc_mode',
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

module.exports = decryptRouteController