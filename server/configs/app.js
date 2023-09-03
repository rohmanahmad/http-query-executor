'use strict'

const { resolve } = require('path')
const moment = require('moment')
const { version, author } = require(resolve('package.json'))

module.exports = {
    node_env: process.env.NODE_ENV || 'production',
    server: {
        host: process.env.APP_HOST || '127.0.0.1',
        port: process.env.APP_PORT || '3000',
        version,
        last_restart: moment().format('YYYY-MMM-DD HH:mm') ,
        author
    },
    middlewares: {
        collector: require(resolve('core/middlewares/collector')),
        auth: require(resolve('core/middlewares/auth')),
    },
    global_middlewares: [
        'collector'
    ],
    modules: [
        'mysql',
        'e2e',
        'mongodb',
        'redis'
    ]
}