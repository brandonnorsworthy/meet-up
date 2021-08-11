const router = require('express').Router();

const htmlRoutes = require('./html');
const apiRoutes = require('./api')

router.use('/', htmlRoutes); //all frontend read routes
router.use('/api', apiRoutes); //create update delete routes

module.exports = router;