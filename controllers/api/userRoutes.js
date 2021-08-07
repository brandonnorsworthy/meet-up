const router = require('express').Router();

const { Users } = require('../../models');

router.post('/login', async function (req, res) {
	try {
		//find a user with the given email
		const dbUserData = await Users.findOne({ where: { email: req.body.email }});

		//if there is no user with that email send back a bad request
		if (!dbUserData) {
			res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
			return;
		}

		//go to database helper function and check hashed password against stored hashed
		const validPassword = await dbUserData.checkPassword(req.body.password);

		//if the entered password was invalid then send back a bad request error
		if (!validPassword) {
			res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
			return;
		}

		console.log('login⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠', dbUserData.get({ plain: true }));

		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.user = dbUserData.get({ plain: true });
		});

		res.status(202);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/register', async function (req, res) {
	try {
		//check database for a user that contains this email
		const dbEmailData = await Users.findOne({ where: { email: req.body.email } });

		//if a user with that email is found then send back that email already exsists
		if (dbEmailData) {
			res.status(400).json({ message: 'email exists' });
			return;
		}

		//check database for a user that contains this username
		const dbUsernameData = await Users.findOne({ where: { username: req.body.username } });

		//if that username is found in the database then return that username is taken
		if (dbUsernameData) {
			res.status(400).json({ message: 'username exists' });
			return;
		}

		//TODO take in a url or image some how
		//creates a new user in database that can be logged in from
		const dbUserData = await Users.create({
			username: req.body.username.trim(),
			email: req.body.email.toLowerCase().trim(),
			password: req.body.password.trim(),
		});

		console.log('register⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠', dbUserData.get({ plain: true }));

		//after users account is created automatically log them into that account
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.user = dbUserData.get({ plain: true });
		});

		//send back 201 everything went ok
		res.status(201);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/logout', function (req, res) {
	//if there is a existing session then it will allow them to try and destroy the session
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;