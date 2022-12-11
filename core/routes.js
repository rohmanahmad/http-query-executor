'use strict'

const rA = require('require-all')

const routes = rA({
    dirname: __dirname + '/../modules/',
    filter: /routes.js$/,
    recursive: true,
    map: (name) => {
        return name.replace('.js', '')
    }
})

module.exports = routes