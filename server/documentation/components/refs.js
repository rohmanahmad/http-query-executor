module.exports = {
  components: {
    response_schema: {
      internal_server_error: {
        type: 'object',
        properties: {
            status: {
                type: 'integer',
                example: 500
            },
            message: {
                type: 'string',
                example: 'Internal Server Error'
            },
            data: {
                type: 'object',
                properties: {
                    error: { type: 'string' },
                    stack_trace: { type: 'array' }
                },
                example: {
                    error: 'Invalid Value Of blabla',
                    stack_trace: [
                        'blablabla1',
                        'blablabla2',
                        '....abla3',
                    ]
                }
            }
        }
      },
      route_not_found: {
        type: 'object',
        properties: {
            status: {
                type: 'integer',
                example: 404
            },
            method: {
                type: 'string',
                example: 'POST'
            },
            message: {
                type: 'string',
                example: 'HTTP URL Not Found'
            }
        }
      }
    }
  }
}