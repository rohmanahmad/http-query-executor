'use strict'

const prefix = 'mysql'

const paths = require('./paths')
const queries = require('./queries')
const forms = require('./forms')
const body = require('./body')

module.exports = { prefix, components: { paths, queries, forms, body } }