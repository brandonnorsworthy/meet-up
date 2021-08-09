const router = require('express').Router();
const moment = require('moment')
const { Responses } = require('../../models');

router.post('/', async function(req, res){
    try {
        const dbResponseData = await Responses.create({
            post_id: req.body.post_id,
            user_id: req.session.user_id,
            response: req.body.response,
            created_at: moment().format()
        },{
            plain: true 
        }
        );
        console.log('redirecting', req.session.username)
        res.status(200).redirect(`/post/${dbResponseData.post_id}`);
    } catch (err) {
        res.status(400).json(err);
    }

})

router.delete('/:id',async function(req,res){
    try {
        const responsesRoutes = await Responses.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
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