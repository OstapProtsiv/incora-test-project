const { Router } = require('express');
const userService = require('../service/user.service');
const emailValidator = require('../../middleware/email.validator');
const first_nameValidator = require('../../middleware/first_name.validator');
const last_nameValidator = require('../../middleware/last_name.validator');
const phoneValidator = require('../../middleware/phone.validator');
const passwordValidator = require('../../middleware/password.validator');
const ApiError = require('../../errors/validation.error');
const authMiddleware = require('../../middleware/auth.middleware');

const router = new Router();

router.post(
  '/users',
  emailValidator,
  first_nameValidator,
  last_nameValidator,
  phoneValidator,
  passwordValidator,
  async (req, res, next) => {
    try {
      const errs = req.errors;
      if (errs) {
        const errsMessages = {};
        errs.forEach((errObj) => {
          if (!errsMessages[errObj.param]) {
            errsMessages[errObj.param] = errObj.msg;
          } else {
            errsMessages[errObj.param] += `,${errObj.msg}`;
          }
        });
        throw ApiError.ValidationError('not validated', errsMessages);
      }
      const {
        email, last_name, first_name, phone, password,
      } = req.body;
      const user = await userService.createUser({
        email, last_name, first_name, phone, password,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.login({ email, password });
    res.cookie('accessToken', token);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const { id } = req.query;
    const user = await userService.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
router.put(
  '/users',

  authMiddleware,
  emailValidator,
  first_nameValidator,
  last_nameValidator,
  phoneValidator,
  passwordValidator,

  async (req, res, next) => {
    try {
      const { id } = req.query;
      const {
        email, last_name, first_name, phone, password,
      } = req.body;
      const updatedUser = await userService.updateUser({
        id, email, last_name, first_name, phone, password,
      });
      req.app.get('socketService').emiter('pushNotification', `user with id:${id} was successfuly updated`);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
