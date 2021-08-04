const router = require('express').Router();

// const userRoutes = require('./userRoutes');

// const publicRoutes = require('./publicRoutes');

const htmlRoutes = require('./HTML');

const apiRoutes = require('./api')

// router.use('/', userRoutes);

// router.use('/',publicRoutes);

router.use('/', htmlRoutes);

router.use('/api', apiRoutes);


module.exports = router;