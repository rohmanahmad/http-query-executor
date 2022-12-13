'use strict'

const { box } = require('tweetnacl/nacl-fast')

const keyPair = async function keyPair(request, response) {
    const { mode='symmetric' } = this.input.queries
    let keyA, keyB, encodedA, encodedB
    keyA = this.providers.e2e.generateKeyPair(mode)
    if (mode === 'asymmetric') {
        keyB = this.providers.e2e.generateKeyPair(mode)
        const Uint8ArrayEncodedA = box.before(keyB.publicKey, keyA.secretKey)
        const Uint8ArrayEncodedB = box.before(keyA.publicKey, keyB.secretKey)
        encodedA = Uint8ArrayEncodedA.join(',')
        encodedB = Uint8ArrayEncodedB.join(',')
    }
    response.apiCollection({
        finalKey: encodedA || keyA,
        keyB: encodedB
    })
}

const keyPairRouteController = {
    name: 'get_pair_key',
    path: '/key/pair',
    method: 'GET',
    middlewares: ['auth'],
    controller: keyPair
}

module.exports = keyPairRouteController