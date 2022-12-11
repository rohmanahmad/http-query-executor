'use strict'

require('dotenv').config({})

const Server = require('./core/server')

const allConfigs = require('require-all')({ dirname: __dirname + '/configs', recursive: true })

new Server()
    .setConfig(allConfigs)
    .start()