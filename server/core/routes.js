'use strict'

const { resolve } = require('path')
const routes = require('require-all')({
    dirname: resolve('modules'),
    filter: /routes.js$/,
    recursive: true,
    map: (name) => {
        return name.replace('.js', '')
    }
})

module.exports = routes