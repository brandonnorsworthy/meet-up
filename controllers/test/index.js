const router = require('express').Router();

router.get('/', function (req, res){
	console.log("hit main route")

	res.status(500);
})

router.get('/edit/:id', function (req, res){
	console.log(req.params.id)

	res.status(200);
});

module.exports = router;