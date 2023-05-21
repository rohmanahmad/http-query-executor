'use strict'

const info = require('./components/info')
const ping = require('./components/ping')
const getKey = require('./components/get-key')
const delKey = require('./components/del-key')
const setKey = require('./components/set-key')

module.exports = {
    name: 'redis-routes',
    prefix: '/redis',
    list: [
        // usahakan urut ya
        info,
        ping,
        setKey,
        getKey,
        delKey,
    ]
}