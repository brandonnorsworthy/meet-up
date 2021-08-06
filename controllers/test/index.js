const router = require('express').Router();

router.get('/', function (req, res){
	//TODO render homepage
	console.log('hit');

	res.render('homepage');
})

module.exports = router;