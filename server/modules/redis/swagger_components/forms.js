'use strict'

const components = [
  {
    name: 'key',
    in: 'formData',
    description: 'Key For Redis',
    required: false,
    type: 'string'
  },
  {
    name: 'value',
    in: 'formData',
    description: 'Value For Redis Key',
    required: false,
    type: 'string'
  },
  {
    name: 'expired',
    in: 'formData',
    description: 'Expired For Redis Key (in second)',
    required: false,
    type: 'integer',
    format: 'int64'
  }
]

module.exports = components