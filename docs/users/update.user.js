module.exports = {
  put: {
    tags: ['Operations with user'],
    description: 'Update user',
    operationId: 'updateuser',
    parameters: [
      {
        name: 'id',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
        example: '1',
        description: 'Id of user to be updated',
      },
    ],
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
