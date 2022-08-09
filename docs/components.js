module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      id: {
        type: 'number',
        description: 'An id of a user',
        example: 1,
      },
      loginSchema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'email to login',
            example: 'user@gmail.com',
          },
          password: {
            type: 'string',
            description: 'password to login',
            example: 'password',
          },
        },
      },
      User: {
        type: 'object',
        required: ['email', 'first_name', 'password'],
        properties: {
          email: {
            type: 'string',
            descrition: "user's email",
            example: 'user@gmail.com',
          },
          first_name: {
            type: 'string',
            description: "user's first name",
            exaple: 'testName',
          },
          last_name: {
            type: 'string',
            description: "user's last name",
            example: 'testSurname',
          },
          phone: {
            type: 'string',
            description: "user's phone number",
            exaple: '0123456789',
          },
          password: {
            type: 'string',
            description: 'user paassword',
            exaple: 'password',
          },
        },
      },
    },
  },
};
