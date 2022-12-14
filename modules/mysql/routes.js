'use strict'

const knowledge = require('./components/knowledge')

module.exports = {
    name: 'main-routes',
    prefix: '/',
    list: [
        // usahakan urut ya
        knowledge
    ]
}