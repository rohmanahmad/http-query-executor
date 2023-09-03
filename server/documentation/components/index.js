const path = require('path')
const refs = require('./refs')
const pkg = require(path.resolve('package.json'))

const head = {
  "swagger": "2.0",
  "info": {
    "description": "Documentation API for WebApp",
    "version": pkg.version,
    "title": 'API Documentation ' + pkg.name,
    // "termsOfService": "http://swagger.io/terms/",
    "contact": {
      "email": pkg.author
    },
    // "license": {
    //   "name": "Apache 2.0",
    //   "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
    // }
  },
  "host": process.env.APP_DOMAIN,
  "basePath": "",
  "schemes": (process.env.APP_HTTP_SCHEME || 'http').split(',').map(x => x.trim()),
  "references": refs
}
module.exports = function (swaggerPaths) {
    return {
      ...head,
      paths: swaggerPaths
    }
}