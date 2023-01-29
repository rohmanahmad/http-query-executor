'use strict'

const ping = require('./components/ping')
const setkey = require('./components/setkey')
const getkey = require('./components/getkey')
const delkey = require('./components/delkey')

module.exports = {
    name: 'redis-routes',
    prefix: '/redis',
    list: [
        // usahakan urut ya
        ping,
        setkey,
        getkey,
        delkey,
    ]
}