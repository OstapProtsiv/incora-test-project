module.exports = {
  get: {
    tags: ['Operations with user'],
    description: 'get one user',
    operationId: 'get one user',
    security: { bearerAuth: [] },
    parameters: [
      {
        in: 'query',
        name: 'id',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'A user id',
        example: 1,
      },
    ],
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
