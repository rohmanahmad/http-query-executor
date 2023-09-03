'use strict'

const body = require('./body')
const queries = require('./queries')
const paths = require('./paths')
const forms = require('./forms')

const prefix = 'main'

module.exports = {prefix, components: {body, queries, paths, forms}}