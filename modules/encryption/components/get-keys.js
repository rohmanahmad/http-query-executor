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
    controller: keyPair
}

module.exports = keyPairRouteController