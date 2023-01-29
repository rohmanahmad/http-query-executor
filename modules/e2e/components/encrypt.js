'use strict'

const encrypt = async function encrypt(request, response) {
    let { finalKey, payload, key, mode } = this.input.body
    if (finalKey) finalKey = new Uint8Array(finalKey.split(','))
    const encrypted = this.providers.e2e.encrypt(finalKey, payload, key, mode)
    response.json({ encrypted })
}

const encryptRouteController = {
    name: 'encrypt',
    path: '/encrypt',
    method: 'POST',
    middlewares: ['auth'],
    controller: encrypt
}

module.exports = encryptRouteController