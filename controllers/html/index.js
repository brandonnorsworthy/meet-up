const { Users, Posts, Responses } = require('../../models');

const router = require('express').Router();

//TODO write down all handlebar files as named in html routes
router.get('/register', function (req, res){
	//TODO render signup.html as handlbars
})

router.get('/login', function (req, res){
	if (req.session.loggedIn) {
		res.direct('/');
		return;
	}

	res.render('login');
});
// will get data

router.get('/', function (req, res){
	//TODO render homepage
})

router.get('/post/:id', function (req, res){
	Posts.findAll({})
		.then(postsData => res.json(postsData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		})
	//TODO render the post filled with content of that specific id
	//? will have to do a query and merge posts table with responses
	//? will have to merge posts and a user (the user that owns the post)
	//? will have to merge into responses the users that own each response
});

// router.get('/:id', (req, res) => {
// 	Posts.findAll({
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 		.then(postsData => res.json(postsData))
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		})
// });

router.get('/user/:id', function (req, res){
	//TODO for now just redirect to homepage
	Users.findAll({})
		.then(usersData => res.json(usersData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		})
});

// router.get('/:id', (req, res) => {
// 	Users.findAll({
// 			where: {
// 			id: req.params.id
// 			}
// 		})
// 		.then(usersData => res.json(usersData))
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		})
// });


// router.get('/responses', (req, res) => {
// 	Responses.findAll({})
// 		.then(responsesData => res.json(responsesData))
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json(err);
// 		})
// });

// router.get('/:id', (req, res) => {
// 	Responses.findAll({
// 		where: {
// 		id: req.params.id
// 		}
// 	})
// 	.then(responsesData => res.json(responsesData))
// 	.catch(err => {
// 		console.log(err);
// 		res.status(500).json(err);
// 	})
// });

module.exports = router;