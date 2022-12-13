'use strict'

const encrypt = require('./components/encrypt')
const decrypt = require('./components/decrypt')
const getKeys = require('./components/get-keys')

module.exports = {
    name: 'encryption-routes',
    prefix: '/e2e',
    list: [
        // usahakan urut ya
        encrypt,
        decrypt,
        getKeys
    ]
}