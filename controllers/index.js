const router = require('express').Router();

// const userRoutes = require('./userRoutes');
// const publicRoutes = require('./publicRoutes');
const htmlRoutes = require('./html');
const apiRoutes = require('./api')
const testRoutes = require('./test')

// router.use('/', userRoutes);
// router.use('/',publicRoutes);
router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/test', testRoutes);

module.exports = router;