const { Users, Posts, Responses } = require('../../models');

const router = require('express').Router();

router.get('/', async function (req, res){
	try {
		const dbPostsData = await Posts.findAll({
			include: [
			  {
				model: Responses,
				model: Users,
			  },
			],
		  });

		const posts = dbPostsData.map((post) =>
			post.get({ plain: true })
		);

		console.log("---------------------------------------------------------")
		console.log(posts)

		res.render('homepage', {
		  loggedIn: req.session.loggedIn,
		  posts,
		});
	  } catch (err) {
		console.log(err);
		res.status(500).json(err);
	  }
})

//TODO write down all handlebar files as named in html routes
router.get('/signup', function (req, res){
	if (req.session.loggedIn) {
		res.direct('/');
		return;
	}

	res.render('signup').status(200);
})

router.get('/login', function (req, res){
	if (req.session.loggedIn) {
		res.direct('/');
		return;
	}

	res.render('login').status(200);
});
// will get data

router.get('/post/:id', async function (req, res){
	const singlePost = await Posts.findAll({
		where: {
			id: req.params.id
		}
	})

	const user = {
		'loggedIn': false
	}
	const response = {
		user: user,
		post: singlePost[0].dataValues
	}

	console.log('⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠');
	console.log(response);

	res.render('post', response).status(200);
	//? will have to do a query and merge posts table with responses
	//? will have to merge posts and a user (the user that owns the post)
	//? will have to merge into responses the users that own each response
});

router.get('/user/:id', function (req, res){
	//! for now just redirect to homepage
	res.direct('/');
	return;

	Users.findAll({})
		.then(usersData => res.json(usersData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		})
});

module.exports = router;