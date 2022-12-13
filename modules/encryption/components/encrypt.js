'use strict'

const encrypt = async function encrypt(request, response) {
    console.log(this.providers)
    response.json({
        version,
        last_restart,
        author
    })
}

const encryptRouteController = {
    name: 'encrypt',
    path: '/encrypt',
    method: 'POST',
    middlewares: ['auth'],
    controller: encrypt
}

module.exports = encryptRouteController