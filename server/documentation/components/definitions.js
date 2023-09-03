const result = require('lodash.result')
const query = {
  key: {
    name: 'key',
    in: 'query',
    description: 'Key For Redis',
    required: false,
    type: 'string'
  }
}

const path = {
  action: {
    name: 'action',
    in: 'path',
    description: 'action type',
    required: false,
    type: 'string'
  },
  table_name: {
    name: 'table_name',
    in: 'path',
    description: 'table name',
    required: false,
    type: 'string'
  },
  collection: {
    name: 'collection',
    in: 'path',
    description: 'collection name',
    required: false,
    type: 'string'
  }
}

const form = {
  key: {
    name: 'key',
    in: 'formData',
    description: 'Key For Redis',
    required: false,
    type: 'string'
  },
  value: {
    name: 'value',
    in: 'formData',
    description: 'Value For Redis Key',
    required: false,
    type: 'string'
  },
  expired: {
    name: 'expired',
    in: 'formData',
    description: 'Expired For Redis Key (in second)',
    required: false,
    type: 'integer',
    format: 'int64'
  },
  final_key: {
    name: 'final_key',
    in: 'formData',
    description: 'final_key For Encryption',
    required: false,
    type: 'string'
  },
  payload: {
    name: 'payload',
    in: 'formData',
    description: 'payload For Encryption',
    required: false,
    type: 'string'
  },
  mode: {
    name: 'mode',
    in: 'formData',
    description: 'mode For Encryption',
    required: false,
    type: 'string'
  },
  public_key: {
    name: 'public_key',
    in: 'formData',
    description: 'public_key For Encryption',
    required: false,
    type: 'string'
  },
  secret_key: {
    name: 'secret_key',
    in: 'formData',
    description: 'secret_key For Encryption',
    required: false,
    type: 'string'
  },
  table_name: {
    name: 'table_name',
    in: 'formData',
    description: 'table_name For Encryption',
    required: false,
    type: 'string'
  }
}

const body = {
  sql_execute: {
    name: 'sql_execute',
    in: 'body',
    description: 'sql, params, options For Execute',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: ['sql'],
      properties: {
        sql: { type: 'string' },
        params: { type: 'object' },
        options: { type: 'object' },
      }
    }
  },
  list_data: {
    name: 'list_data',
    in: 'body',
    description: 'sql, params, options For Execute',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: ['sql'],
      properties: {
        sql: { type: 'string' },
        params: { type: 'object' },
        options: { type: 'object' },
      }
    }
  },
  add_data: {
    name: 'add_data',
    in: 'body',
    description: 'sql, params, options For Execute',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: ['sql'],
      properties: {
        sql: { type: 'string' },
        params: { type: 'object' },
        options: { type: 'object' },
      }
    }
  },
  delete_data: {
    name: 'delete_data',
    in: 'body',
    description: 'sql, params, options For Execute',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: ['sql'],
      properties: {
        sql: { type: 'string' },
        params: { type: 'object' },
        options: { type: 'object' },
      }
    }
  },
  update_data: {
    name: 'update_data',
    in: 'body',
    description: 'sql, params, options For Execute',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: ['sql'],
      properties: {
        sql: { type: 'string' },
        params: { type: 'object' },
        options: { type: 'object' },
      }
    }
  },
  table_create: {
    name: 'table_create',
    in: 'body',
    description: 'schema',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: ['table_name', 'schema'],
      properties: {
        table_name: { type: 'string' },
        schema: {
          type: 'object',
          example: {
            field1: 'string',
            field2: 'string',
            field3: 'string',
            fieldN: 'string'
          }
        },
        indexes: {
          type: 'array',
          items: [
            {
              type: 'object',
              properties: {
                index_key_1: 1
              }
            }
          ]
        },
      }
    }
  }
}

const definitions = {
  query,
  path,
  form,
  body
}

module.exports = function (key, requires, enums, defaults) {
  const dataObject = result(definitions, key, null)
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