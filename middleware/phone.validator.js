/* eslint-disable no-useless-escape */
module.exports = (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      next();
    }
    const isPhoneNumber = phone
      .match(
        /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
      );
    if (!isPhoneNumber) {
      if (req.errors) {
        req.errors.push({ param: 'phone', msg: 'wrong phone number' });
      } else {
        req.errors = [{ param: 'phone', msg: 'wrong phone number' }];
      }
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
