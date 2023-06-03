'use strict'

require('dotenv').config({})

const { resolve } = require('path')
const Server = require('./core/server')

const allConfigs = require('require-all')({ dirname: resolve('configs'), recursive: true })

new Server()
    .setConfig(allConfigs)
    .start()