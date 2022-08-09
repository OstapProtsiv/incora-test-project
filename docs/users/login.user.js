module.exports = {
  post: {
    tags: ['Auth'],
    description: 'login',
    operationId: 'login',
    security: { bearerAuth: [] },
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/loginSchema',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Loginned succesfuly',
        content: {
          'application/json': {
            schema: {
              type: 'string',
              expample: 'xxxxx.yyyyy.zzzzz',
            },
          },

        },
      },
      500: {
        description: 'Internal server error',
      },
    },
  },
};
