const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');
const responsesRoutes = require('./responsesRoutes.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/response', responsesRoutes);
module.exports = router;