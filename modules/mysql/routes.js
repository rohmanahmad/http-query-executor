'use strict'

const knowledge = require('./components/knowledge')
const execute = require('./components/execute')

module.exports = {
    name: 'mysql-routes',
    prefix: '/mysql',
    list: [
        // usahakan urut ya
        knowledge,
        execute,
    ]
}