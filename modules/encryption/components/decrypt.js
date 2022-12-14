'use strict'

const decrypt = async function decrypt(request, response) {
    let { finalKey, payload, key, mode } = this.input.body
    if (finalKey) finalKey = new Uint8Array(finalKey.split(','))
    const decrypted = this.providers.e2e.decrypt(finalKey, payload, key, mode)
    response.json({decrypted})
}

const decryptRouteController = {
    name: 'decrypt',
    path: '/decrypt',
    method: 'POST',
    middlewares: ['auth'],
    controller: decrypt
}

module.exports = decryptRouteController