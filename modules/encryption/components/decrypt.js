'use strict'

const decrypt = async function decrypt(request, response) {
    console.log(this.providers)
    response.json({
        version,
        last_restart,
        author
    })
}

const decryptRouteController = {
    name: 'decrypt',
    path: '/decrypt',
    method: 'POST',
    middlewares: ['auth'],
    controller: decrypt
}

module.exports = decryptRouteController