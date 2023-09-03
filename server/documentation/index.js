'use strict'

const result = require('lodash.result')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./components/index')
const path = require('path')
const pkg = require(path.resolve('package.json'))

class Documentation {
  constructor(components = []) {
    this.components = components
    this.configs = {}
  }

  definition (key, requires, enums, defaults) {
    const dataObject = result(this.definitions, key, null)
    if (!dataObject) throw new Error(`Invalid Key for (${key})`)
    if (result(requires, key)) {
      dataObject['required'] = result(requires, key)
    }
    if (dataObject) {
      if (result(enums, key)) {
        dataObject.enum = result(enums, key)
      }
      if (result(defaults, key)) {
        dataObject['default'] = result(defaults, key)
      }
    }
    return dataObject
  }

  getConfig() {
    this.swaggerDoc = this.getSwaggerDocRoute
    this.getDefinition()
    return this
  }

  getDefinition() {
    let definitions = {forms: {}, paths: {}, queries: {}, body: {}}
    if (this.components.length === 0) return definitions
    for (const c of this.components) {
      const { prefix, components } = require(path.resolve(`modules/${c}/swagger_components/index`))
      const { forms, queries, paths, body } = this.transformComponent(prefix, components)
      Object.assign(definitions['forms'], forms)
      Object.assign(definitions['queries'], queries)
      Object.assign(definitions['paths'], paths)
      Object.assign(definitions['body'], body)
    }
    this.definitions = definitions
  }

  transformComponent(prefix, components) {
    const objectDefintion = {forms: {}, paths: {}, queries: {}, body: {}}
    for (const c in components) {
      const arrayComponents = components[c] || []
      if (arrayComponents.length === 0) continue
      const cObj = arrayComponents.reduce(function (r, x) {
        const name = prefix + '_' + x.name
        r[name] = x
        return r
      }, {})
      Object.assign(objectDefintion[c], cObj)
    }
    return objectDefintion
  }

  getSwaggerDocRoute(app = null, routes = null) {
    if (app && routes) {
      app.use('/documentation/' + pkg.version, swaggerUi.serve, swaggerUi.setup(swaggerDocument(routes)))
    }
  }
}

module.exports = Documentation
