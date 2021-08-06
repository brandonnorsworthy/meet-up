const router = require('express').Router();

const { Users } = require('../../models');

router.post('/login',async function(req, res){
	//TODO attach the user id to the session so we can look at who is logged in at anytime
	try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    
    console.log('Db user we found!!!', dbUserData)

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again! SECOND!!!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


router.post('/register',async function(req, res){
	try {
    const dbUserData = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    console.log('We just signed up in the route!!!', dbUserData)

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout',function(req, res){
	if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;