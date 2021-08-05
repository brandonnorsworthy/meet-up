const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');
const responsesRoutes = require('./responsesRoutes.js');

//? website.com/api/post/2/edit
//? router.put(:id/edit)
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/responses', responsesRoutes);
module.exports = router;