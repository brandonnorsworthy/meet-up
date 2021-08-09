const moment = require('moment');
const router = require('express').Router();
const { Users, Posts, Responses } = require('../../models');
const { post } = require('../api/userRoutes');

//home route returns the homepage
router.get('/', async function (req, res) {
	try {
		let sorting = ['upvotes', 'ASC']
		const dbPostsData = await Posts.findAll({
			limit: 10,
			include: [
				{ model: Users },
				{ model: Responses }
			],
			order: [sorting],
			plain: true
		});

		if (req.session.loggedIn) {
			console.log(req.session.username, "requested the homepage at", moment().format("h:mm a on MMMM Do, YYYY"))
		} else {
			console.log("Anonymous requested the homepage at", moment().format("h:mm a on MMMM Do, YYYY"))
		}

		dbPostsData.forEach(post => {
			post.responses_length = post.Responses.length;
			post.date_occuring = moment(post.date_occuring).format('h:mm a on MMMM Do, YYYY');
			post.createdAt = moment(post.createdAt).fromNow();
		});

		res.status(200).render('homepage', {
			session: { loggedIn: req.session.loggedIn, username: req.session.username },
			dbPostsData,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

//home route returns the homepage
router.post('/', async function (req, res) {
	try {
		console.log('post hit', req.body.sort)
		let sorting = ['createdAt', 'DESC']

		const dbPostsData = await Posts.findAll({
			limit: 10,
			include: [
				{ model: Users },
				{ model: Responses }
			],
			order: [sorting],
			plain: true
		});

		if (req.session.loggedIn) {
			console.log(req.session.username, "requested the homepage at", moment().format("h:mm a on MMMM Do, YYYY"))
		} else {
			console.log("Anonymous requested the homepage at", moment().format("h:mm a on MMMM Do, YYYY"))
		}

		dbPostsData.forEach(post => {
			post.responses_length = post.Responses.length;
			post.date_occuring = moment(post.date_occuring).format('h:mm a on MMMM Do, YYYY');
			post.createdAt = moment(post.createdAt).fromNow();
		});

		res.status(200).render('homepage', { //todo bug related to page not re-rendering
			session: { loggedIn: req.session.loggedIn, username: req.session.username },
			posts: dbPostsData,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

//specific post route returns page to view page by id
router.get('/post/:id', async function (req, res) {
	try {
		console.log('getting post for user')
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
			],
			plain: true
		});

		if (!dbPostData) {
			console.log('getting home for user')

			res.status(400).redirect('/');
			// .json({ message:"post does not exsist" });
		}
		if (req.session.loggedIn) {
			console.log(req.session.username, "requested the post", dbPostsData.title, "at", moment().format("h:mm a on MMMM Do, YYYY"))
			//if current user is the same as the author of the post then show them the author buttons edit and delete
			if (dbPostsData.user_id === req.session.user_id) {
				dbPostsData.isOwner = true;
			}
		} else {
			console.log("Anonymous requested the post", dbPostsData.title, "at", moment().format("h:mm a on MMMM Do, YYYY"))
		}


		dbPostsData.responses_length = dbPostsData.Responses.length;
		dbPostsData.date_occuring = moment(dbPostsData.date_occuring).format('h:mm a on MMMM Do, YYYY');
		dbPostsData.createdAt = moment(dbPostsData.createdAt).fromNow();
		dbPostsData.Responses.forEach(response => {
			if (req.session.user_id === response.user_id) {
				response.isOwner = true;
			}
			response.createdAt = moment(response.createdAt).fromNow();
		});

		res.status(200).render('post', {
			session: req.session,
			post: dbPostsData,
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
		res.redirect('/');
		return;
	}

	res.status(200).render('signup');
})

router.get('/user/:id', function (req, res) {
	//! for now just redirect to homepage
	res.redirect('/');
	return;

	Users.findAll({})
		.then(usersData => res.json(usersData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		})
});

module.exports = router;