module.exports = (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      if (req.errors) {
        req.errors.push({ param: 'password', msg: 'no password' });
        next();
      } else {
        req.errors = [{ param: 'password', msg: 'no password' }];
        next();
      }
    }
    if (password.length < 5 || password.length > 16) {
      if (req.errors) {
        req.errors.push({ param: 'password', msg: 'must contain from 5 till 15 symbols' });
      } else {
        req.errors = [{ param: 'password', msg: 'must contain from 5 till 15 symbols' }];
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
