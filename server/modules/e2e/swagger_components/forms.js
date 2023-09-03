'use strict'

const components = [
  {
    name: 'key',
    in: 'formData',
    description: 'Key For Encryption',
    required: false,
    type: 'string'
  },
  {
    name: 'final_key',
    in: 'formData',
    description: 'final_key For Encryption',
    required: false,
    type: 'string'
  },
  {
    name: 'payload',
    in: 'formData',
    description: 'payload For Encryption',
    required: false,
    type: 'string'
  },
  {
    name: 'mode',
    in: 'formData',
    description: 'mode For Encryption',
    required: false,
    type: 'string'
  },
  {
    name: 'public_key',
    in: 'formData',
    description: 'public_key For Encryption',
    required: false,
    type: 'string'
  },
  {
    name: 'secret_key',
    in: 'formData',
    description: 'secret_key For Encryption',
    required: false,
    type: 'string'
  }
]

module.exports = components