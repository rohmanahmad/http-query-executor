'use strict'

import moment from 'moment'
import Swal from 'sweetalert2'

class Alerts {
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
      // code alert here
      Swal.fire({ type: 'error', title: 'ERROR', text: errorData.message })
    }
  }

  info (message='...') {
    if (message) {
      // code alert here
      Swal.fire({ type: 'info', title: 'INFO', text: message })
    }
  }

  warning (message) {
    if (message) {
      // code alert here
      Swal.fire({ type: 'warning', title: 'WARNING', text: message })
    }
  }
}

export default function (config={}) {
  return new Alerts(config)
}