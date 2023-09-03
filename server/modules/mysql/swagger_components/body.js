'use strict'

const components = [
  {
    name: 'sql',
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
  {
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
  {
    name: 'insert_data',
    in: 'body',
    description: 'sql, params, options For Execute',
    required: false,
    type: 'object',
    schema: {
      type: 'object',
      required: [],
      example: {
        id: 123
      }
    }
  },
  {
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
  {
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
  {
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
]

module.exports = components