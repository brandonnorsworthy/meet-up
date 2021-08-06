const moment = require('moment');
const router = require('express').Router();
const { Users, Posts, Responses } = require('../../models');
const { post } = require('../api/userRoutes');

//home route returns the homepage
router.get('/', async function (req, res) {
	try {
		const dbPostsData = await Posts.findAll({
			limit: 10,
			include: [
				{ model: Users },
				{ model: Responses }
			]
		});

		if (req.session.loggedIn) {
			console.log(req.session.username, "requested the homepage at", moment().format("h:mm a on MMMM Do, YYYY"))
		} else {
			console.log("Anonymous requested the homepage at", moment().format("h:mm a on MMMM Do, YYYY"))
		}

		let posts = dbPostsData.map((post) =>
			post.get({ plain: true })
		);

		posts.forEach(post => {
			post.responses_length = post.Responses.length;
			post.date_occuring = moment(post.date_occuring).format('h:mm a on MMMM Do, YYYY');
			post.createdAt = moment(post.createdAt).fromNow();
		});

		res.status(200).render('homepage', {
			session: { loggedIn: req.session.loggedIn, username: req.session.username },
			posts,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

//specific post route returns page to view page by id
router.get('/post/:id', async function (req, res) {
	try {
		const dbPostData = await Posts.findOne({
			where: { id: req.params.id },
			include: [
				{ model: Users },
				{
					model: Responses,
					include: {
						// order: '"date" DESC',
						model: Users,
					}
				}
			]
		});

		let post = dbPostData.get({ plain: true })

		if (req.session.loggedIn) {
			console.log(req.session.username, "requested the post", post.title, "at", moment().format("h:mm a on MMMM Do, YYYY"))
		} else {
			console.log("Anonymous requested the post", post.title, "at", moment().format("h:mm a on MMMM Do, YYYY"))
		}

		post.responses_length = post.Responses.length;
		post.date_occuring = moment(post.date_occuring).format('h:mm a on MMMM Do, YYYY');
		post.createdAt = moment(post.createdAt).fromNow();
		post.Responses.forEach(response => {
			response.createdAt = moment(response.createdAt).fromNow();
		});

		res.status(200).render('post', {
			loggedIn: req.session.loggedIn,
			post,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', function (req, res) {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.status(200).render('login');
});

router.get('/signup', function (req, res) {
	if (req.session.loggedIn) {
		res.direct('/');
		return;
	}

	res.status(200).render('signup');
})

router.get('/user/:id', function (req, res) {
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