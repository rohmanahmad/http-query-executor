const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./components/index')
const path = require('path')
const pkg = require(path.resolve('package.json'))
const definition = require('./components/definitions')

module.exports = {
  swaggerDoc: function (app, routes) {
    if (app) {
      app.use('/documentation/' + pkg.version, swaggerUi.serve, swaggerUi.setup(swaggerDocument(routes)))
    }
  },
  definition
}
