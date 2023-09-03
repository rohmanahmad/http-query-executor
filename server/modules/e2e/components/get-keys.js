'use strict'

const { box } = require('tweetnacl/nacl-fast')

const keyPair = async function keyPair(request, response) {
    let { public_key: publicKey, secret_key: secretKey } = this.input.body
    let keyA, keyB, encodedA

    keyA = this.providers.e2e.generateKeyPair('asymmetric')

    publicKey = new Uint8Array(publicKey.split(','))
    secretKey = new Uint8Array(secretKey.split(','))

    keyB = { publicKey, secretKey }

    const Uint8ArrayEncodedA = box.before(keyB.publicKey, keyA.secretKey)

    encodedA = Uint8ArrayEncodedA.join(',')

    response.json({
        final: encodedA
    })
}

const keyPairRouteController = {
    name: 'get_pair_key',
    path: '/key/pair',
    method: 'POST',
    middlewares: ['auth'],
    controller: keyPair,
    swagger: {
        tags: ['Encryption'],
        summary: 'Encryption (get key pair)',
        description: 'get key pair data with key',
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json',
            'application/xml',
        ],
        parameters: [
            'forms.enc_public_key',
            'forms.enc_secret_key'
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

module.exports = keyPairRouteController