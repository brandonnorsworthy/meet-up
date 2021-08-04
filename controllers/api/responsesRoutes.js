const router = require('express').Router();
const { Responses } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/',function(req, res){
    //TODO take in message, you will record the date, message, and link to a user_id that created it
    try {
        const userResponses = Responses.getcreate({
            ...req.body,
            responses_id: req.session.responses_id,
        });

        res.status(200).json(userResponses);
    } catch (err) {
        res.status(400).json(err);
    }
    
})

router.delete('/:id',function(req,res){
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













// router.post('/', withAuth, (req, res) => {
// if (req.session) {
// Responses.create({
// comment_text: req.body.comment_text,
// post_id: req.body.post_id,
// user_id: req.session.user_id,
// })
// .then(responsesData => res.json(responsesData))
// .catch(err => {
// console.log(err);
// res.status(400).json(err);
// })
// }
// });

// router.put('/:id', withAuth, (req, res) => {
// Responses.update({
// comment_text: req.body.comment_text
// }, {
// where: {
// id: req.params.id
// }
// }).then(responsesData => {
// if (!responsesData) {
// res.status(404).json({ message: 'No comment found with this id' });
// return;
// }
// res.json(responsesData);
// }).catch(err => {
// console.log(err);
// res.status(500).json(err);
// });
// });

// router.delete('/:id', withAuth, (req, res) => {
// Responses.destroy({
// where: {
// id: req.params.id
// }
// }).then(responsesData => {
// if (!responsesData) {
// res.status(404).json({ message: 'No comment found with this id' });
// return;
// }
// res.json(responsesData);
// }).catch(err => {
// console.log(err);
// res.status(500).json(err);
// });
// });

module.exports = router;