'use strict'

import moment from 'moment'

class Logger {
  constructor (config) {
    this.config = config
  }

  setPrefix(prefix) {
    if (prefix) this.config.prefix = `[${prefix}]`
    return this
  }

  setAlertName(name) {
    if (name) this.config.alertName = `[${name}]`
    return this
  }

  getTimeFormat (format='LLL') {
    return moment().format(format)
  }

  error (errorData) {
    if (errorData) {
      console.error(this.getTimeFormat(), this.config.alertName, this.config.prefix, errorData)
    }
  }

  info (data) {
    if (data) {
      console.info(this.getTimeFormat(), this.config.alertName, this.config.prefix, data)
    }
  }

  log (data) {
    if (data) {
      console.log(this.getTimeFormat(), this.config.alertName, this.config.prefix, data)
    }
  }

  warning (data) {
    if (data) {
      console.warn(this.getTimeFormat(), this.config.alertName, this.config.prefix, data)
    }
  }
}

export default function (config={}) {
  return new Logger(config)
}