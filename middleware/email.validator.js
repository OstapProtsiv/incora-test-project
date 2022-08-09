module.exports = (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      if (req.errors) {
        req.errors.push({ param: 'email', msg: 'no email' });
        next();
      } else {
        req.errors = [{ param: 'email', msg: 'no email' }];
        next();
      }
    }
    const isEmail = email.toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    if (!isEmail) {
      if (req.errors) {
        req.errors.push({ param: 'email', msg: 'wrong entered email' });
      } else {
        req.errors = [{ param: 'email', msg: 'wrong entered email' }];
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
