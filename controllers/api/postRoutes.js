const router = require('express').Router();
const moment = require('moment');
const chalk = require('chalk');
const { Posts } = require('../../models');
const sequelize = require('../../config/connection');

router.post('/', function (req, res) {
    try {
        const postRoutes = Posts.getcreate({
            ...req.body,
            post_id: req.session.post_id,
        }, {
            plain: true
        });

        res.status(200).json(postRoutes);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/create', async function (req, res) {
    try {
        if (!req.session.loggedIn) {
            console.log(chalk.bgYellow("WARNING: "), chalk.magenta("Anonymous"), "tried to create a new post", "at", moment().format("h:mm a on MMMM Do, YYYY"))
            throw ('message:User not-logged in')
        }

        const dbPostData = await Posts.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            upvotes: 0,
            date_occuring: moment(req.body.date).format(),
            user_id: req.session.user_id,
            createdAt: moment().format(),
        }, {
            plain: true
        });

        console.log(chalk.black.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "created a new post", chalk.magenta(dbPostData.title), "at", moment().format("h:mm a on MMMM Do, YYYY"))

        res.status(200).json({ message: "Post created" })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/upvote/:id', async function (req, res) {
    try {
        if (req.session.loggedIn) {
            console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested to upvote the post id", chalk.magenta(req.params.id), "at", moment().format("h:mm a on MMMM Do, YYYY"))
        } else {
            console.log(chalk.bgYellow("WARNING: "), chalk.magenta("Anonymous"), "tried to upvote the post id", chalk.magenta(req.params.id), "at", moment().format("h:mm a on MMMM Do, YYYY"))
            throw ('message:User not-logged in')
        }

        let incrementStr = ''
        if (req.body.increment > 0) {
            incrementStr = 'upvotes + 1'
        } else {
            incrementStr = 'upvotes - 1'
        }

        const dbPostData = await Posts.update({
            upvotes: sequelize.literal(incrementStr)
        }, {
            where: {
                id: Number(req.params.id)
            }
        }).catch(err => {
            console.log(chalk.black.bgRed(`ERROR: err: ${err}`))
        })

        res.status(200).json({ message: `successfully upvoted post ${req.params.id}`});
    } catch (err) {
        res.status(400).json(err);
    }
})

router.put('/edit/:id', function (req, res) {
    try {
        const userEdited = Posts.getcreate({
            ...req.body,
            post_edited: req.session.post_edited,
        });

        res.status(200).json(userEdited);
    } catch (err) {
        res.status(400).json(err);
    }

})

router.post('/delete/:id', async function (req, res) {
    try {
        if (req.session.loggedIn) {
            console.log(chalk.bgGreen("SUCCESS: "), chalk.magenta(req.session.username), "requested to delete the post id", chalk.magenta(req.params.id), "at", moment().format("h:mm a on MMMM Do, YYYY"))
        } else {
            console.log(chalk.bgYellow("WARNING: "), chalk.magenta("Anonymous"), "tried to delete the post id", chalk.magenta(req.params.id), "at", moment().format("h:mm a on MMMM Do, YYYY"))
            throw ('message:User not-logged in')
        }

        const userPost = await Posts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!userPost) {
            res.status(404).json({ message: 'No Posts to delete here!' });
            return;
        }

        res.status(200).json(userPost);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;