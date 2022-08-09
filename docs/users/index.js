const createUser = require('./create.user');
const getOneUser = require('./getOne.user');
const loginUser = require('./login.user');
const updateUser = require('./update.user');

module.exports = {
  paths: {
    '/users': {
      ...createUser,
      ...getOneUser,
      ...updateUser,
    },
    '/login': {
      ...loginUser,
    },
  },
};
