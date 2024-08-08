const router = require('express').Router();

const view_routes = require('./view_routes');
const user_routes = require('./user_routes');


router.use('/', [
  view_routes,
  user_routes
]);


module.exports = router;