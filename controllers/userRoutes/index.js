const router = require('express').Router();

const userLogin = require('./userLogin');

const register = require('./register');

router.use('/userLogin', userLogin);

router.use('/register', register);

module.exports = router;