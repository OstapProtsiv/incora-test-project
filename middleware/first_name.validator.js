module.exports = (req, res, next) => {
  try {
    const { first_name } = req.body;
    if (!first_name) {
      if (req.errors) {
        req.errors.push({ param: 'first_name', msg: 'no first_name' });
        next();
      } else {
        req.errors = [{ param: 'first_name', msg: 'no first_name' }];
        next();
      }
    }
    const isAlpha = first_name.toLowerCase()
      .match(
        /^[a-zA-Z]+$/,
      );
    if (!isAlpha) {
      if (req.errors) {
        req.errors.push({ param: 'first_name', msg: 'must contain only lettets' });
      } else {
        req.errors = [{ param: 'first_name', msg: 'must contain only lettets' }];
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
