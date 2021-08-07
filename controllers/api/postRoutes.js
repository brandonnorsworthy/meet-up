const router = require('express').Router();
const moment = require('moment');
const { Posts } = require('../../models');

router.post('/', function(req, res) {
    try {
        const postRoutes = Posts.getcreate({
            ...req.body,
            post_id: req.session.post_id,
        });

        res.status(200).json(postRoutes);
    } catch (err) {
        res.status(400).json(err);
    }
})

//TODO possibly reverse this so its more formatted to match like website.com/posts/:id/upvote***
router.post('/create', async function(req, res) {
    try {
        let date = moment().format()
        console.log(date)
        // moment(date).add(24, 'h');
        // console.log(date)
		console.log('post-attempted-created⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠');
		console.log(req.body)

		const dbPostData = await Posts.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            upvote: 0,
            date_occuring: date,
            user_id: req.session.user_id,
            created_at: moment().format()
		});

		console.log('post-created⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠', dbPostData.get({ plain: true }));
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
})

//TODO possibly reverse this so its more formatted to match like website.com/posts/:id/upvote***
// /api/posts/upvote/1
router.post('/upvote/:id', function(req, res) {
    console.log('recieved upvote')
    try {
        const userUpvote = Posts.update({
            post_upvotes: req.session.post_upvotes
        },{
            where: { id: req.params.id },
            returning: true,
            plain: true
        })
        .then(function (result) {
            console.log(result);
        });

        res.status(200).json(userUpvote);
    } catch (err) {
        res.status(400).json(err);
    }
})

//TODO possibly reverse this so its more formatted to match like website.com/posts/:id/upvote***
router.put('/edited/:id', function(req, res) {
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


router.delete('/:id', async function(req, res) {
    //TODO make sure the person that is deleting it in the session matches the author of the response trying to be deleted
    try {
        const userPost = await Posts.destroy({
            where: {
                id: req.params.id,
                post_id: req.session.post_id,
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