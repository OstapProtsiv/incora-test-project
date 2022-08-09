module.exports = (req, res, next) => {
  try {
    const { last_name } = req.body;
    if (!last_name) {
      next();
    }
    if (typeof last_name !== 'string') {
      if (req.errors) {
        req.errors.push({ param: 'last_name', msg: 'must be string' });
      } else {
        req.errors = [{ param: 'last_name', msg: 'must be string' }];
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
