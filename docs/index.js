const basicInfo = require('./basicInfo');
const components = require('./components');
const userPaths = require('./users/index');

module.exports = {
  ...basicInfo,
  //   ...servers,
  ...components,
  //   ...tags,
  ...userPaths,
};
