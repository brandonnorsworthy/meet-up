    const router = require('express').Router();
    const {Responses} = require('../../models');
    const withAuth = require('../../utils/auth');
    
    router.get('/', (req, res) => {
Responses.findAll({})
    .then(responsesData => res.json(responsesData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    })
    });

    router.get('/:id', (req, res) => {
Responses.findAll({
    where: {
    id: req.params.id
    }
    })
    .then(responsesData => res.json(responsesData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    })
    });

    router.post('/', withAuth, (req, res) => {
    if (req.session) {
Responses.create({
    comment_text: req.body.comment_text,
    post_id: req.body.post_id,
    user_id: req.session.user_id,
    })
    .then(responsesData => res.json(responsesData))
    .catch(err => {
    console.log(err);
    res.status(400).json(err);
    })
    }
    });

    router.put('/:id', withAuth, (req, res) => {
Responses.update({
    comment_text: req.body.comment_text
    }, {
    where: {
    id: req.params.id
    }
    }).then(responsesData => {
    if (!responsesData) {
    res.status(404).json({ message: 'No comment found with this id' });
    return;
    }
    res.json(responsesData);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
    });

    router.delete('/:id', withAuth, (req, res) => {
Responses.destroy({
    where: {
    id: req.params.id
    }
    }).then(responsesData => {
    if (!responsesData) {
    res.status(404).json({ message: 'No comment found with this id' });
    return;
    }
    res.json(responsesData);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
    });
    module.exports = router;