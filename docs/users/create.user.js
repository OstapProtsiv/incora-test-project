module.exports = {
  post: {
    tags: ['Operations with user'],
    description: 'create a user',
    operationId: 'create a user',
    security: { bearerAuth: [] },
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User created succesfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
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
