const moment = require('moment');
const router = require('express').Router();
const chalk = require('chalk');
const { Users, Posts, Responses } = require('../../models');

router.get('/', async function (req, res) {
	try {
		let sorting = ['created_at', 'DESC']
		const dbPostsData = await Posts.findAll({
			limit: 10,
			include: [
				{ model: Users },
				{ model: Responses }
			],
			order: [sorting]
		});

		if (req.session.loggedIn) {
			console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested the", chalk.magenta("homepage"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
		} else {
			console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta("Anonymous"), "requested the", chalk.magenta("homepage"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
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
			session: req.session,
			posts,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

//! home route returns the homepage not working properly
router.post('/', async function (req, res) {
	try {
		console.log('post hit', req.body.sort)
		let sorting = ['createdAt', 'DESC']

		if (req.body.sort == 'new') {
			sorting = ['createdAt', 'DESC']
		} else if (req.body.sort == 'top') {
			sorting = ['upvotes', 'ASC']
		}

		const dbPostsData = await Posts.findAll({
			limit: 50,
			include: [
				{ model: Users },
				{ model: Responses }
			],
			order: [sorting]
		});

		if (req.session.loggedIn) {
			console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested the", chalk.magenta("homepage"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
		} else {
			console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta("Anonymous"), "requested the", chalk.magenta("homepage"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
		}

		let posts = dbPostsData.map((post) =>
			post.get({ plain: true })
		);

		posts.forEach(post => {
			post.responses_length = post.Responses.length;
			post.date_occuring = moment(post.date_occuring).format('h:mm a on MMMM Do, YYYY');
			post.createdAt = moment(post.createdAt).fromNow();
		});

		console.log("about to render page")

		res.status(200).render('homepage', { //todo bug related to page not re-rendering
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

		if (!dbPostData) {
			if (req.session.loggedIn) {
				console.log(chalk.bgYellow("WARNING: "), chalk.magenta(req.session.username), "requested the post", chalk.magenta(req.params.id) ,"(does not exist) at", moment().format("h:mm a on MMMM Do, YYYY"))
			} else {
				console.log(chalk.bgYellow("WARNING: "), chalk.magenta("Anonymous"), "requested the post", chalk.magenta(req.params.id) ,"(does not exist) at", moment().format("h:mm a on MMMM Do, YYYY"))
			}

			res.status(400).redirect('/');
			// .json({ message:"post does not exsist" });
		}

		let post = dbPostData.get({ plain: true })

		if (req.session.loggedIn) {
			console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested the post", chalk.magenta(post.title) ,"at", moment().format("h:mm a on MMMM Do, YYYY"))
			//if current user is the same as the author of the post then show them the author buttons edit and delete
			if (post.user_id === req.session.user_id) {
				post.isOwner = true;
			}
		} else {
			console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta("Anonymous"), "requested the post", chalk.magenta(post.title.id) ,"at", moment().format("h:mm a on MMMM Do, YYYY"))
		}

		post.responses_length = post.Responses.length;
		post.date_occuring = moment(post.date_occuring).format('h:mm a on MMMM Do, YYYY');
		post.createdAt = moment(post.createdAt).fromNow();
		post.Responses.forEach(response => {
			if (req.session.user_id === response.user_id) {
				response.isOwner = true;
			}
			response.createdAt = moment(response.createdAt).fromNow();
		});

		res.status(200).render('post', {
			session: req.session,
			post,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/login', function (req, res) {
	if (req.session.loggedIn) {
		console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested the", chalk.magenta("login page"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
		res.redirect('/');
		return;
	} else {
		console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta("Anonymous"), "requested the", chalk.magenta("login page"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
	}

	res.status(200).render('login');
});

router.get('/signup', function (req, res) {
	if (req.session.loggedIn) {
		console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested the", chalk.magenta("signup page"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
		res.redirect('/');
		return;
	} else {
		console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta("Anonymous"), "requested the", chalk.magenta("signup page"), "at", moment().format("h:mm a on MMMM Do, YYYY"))
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

router.get('/map/:placename', (req,res) => {
	res.render('map')
})

module.exports = router;