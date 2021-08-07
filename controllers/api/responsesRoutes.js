const router = require('express').Router();
const moment = require('moment')
const { Responses } = require('../../models');
// const withAuth = require('../../utils/auth');

// /api/responses/  POST guy
router.post('/', async function(req, res){
    //TODO take in message, you will record the date, message, and link to a user_id that created it
    try {
        const dbResponseData = await Responses.create({
            post_id: req.body.post_id,
            user_id: req.session.user_id,
            response: req.body.response,
            created_at: moment().format()
        });

		let responses = dbResponseData.get({ plain: true })

        console.log('redirecting', req.session.username)

        res.status(200).redirect(`/post/1`);
    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/:id',async function(req,res){
    // cascade on delete.
    //TODO make sure the person that is deleting it in the session matches the author of the response trying to be deleted
    try {
        const responsesRoutes = await Responses.destroy({
            where: {
                id: req.params.id,
                responses_id: req.session.responses_id,
            },
        });

        if (!responsesRoutes) {
            res.status(404).json({ message: 'Bye!' });
            return;
        }

        res.status(200).json(responsesRoutes);
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;