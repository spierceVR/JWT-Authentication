const auth = require('./auth');
const private = require('./private');
module.exports = app => {
  // public routes
  app.use('/auth', auth);
  /* includes auth/register and auth/login */
  // private routes
  app.use('/private', private);
};