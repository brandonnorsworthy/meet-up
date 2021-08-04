			const router = require('express').Router();
			const {
				Posts,
				Users,
				Responses,
			} = require('../../models');
			
			router.post('/',function(req, res){

	
			})

			router.post('/response/:id',function(req, res){
			
				
			})
			
			router.put('/upvote/:id',function(req, res){
			
				
			})

			router.put('/editpost/:id',function(req, res){
			
				
			})

			router.put('/editresponse/:id',function(req, res){
			
				
			})


			router.delete('/:id',function(req,res){
      // cascade on delete.

			})

			router.delete('/deleterespones/:id',function(req,res){
				// cascade on delete.
	
				})









				
			// const sequelize = require('../../config/connection');
			// const withAuth = require('../../utils/auth');

			// router.get('/', (req, res) => {
				
			// 	console.log('======================');
			// 	Post.findAll({
			// 			attributes: ['id',
			// 				'title',
			// 				'content',
			// 				'created_at'
			// 			],
			// 			order: [
			// 				['created_at', 'DESC']
			// 			],
			// 			include: [{
			// 					model: User,
			// 					attributes: ['username']
			// 				},
			// 				{
			// 					model: Comment,
			// 					attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
			// 					include: {
			// 						model: User,
			// 						attributes: ['username']
			// 					}
			// 				}
			// 			]
			// 		})
			// 		.then(dbPostData => res.json(dbPostData.reverse()))
			// 		.catch(err => {
			// 			console.log(err);
			// 			res.status(500).json(err);
			// 		});

			// });
			// router.get('/:id', (req, res) => {
			// 	Post.findOne({
			// 			where: {
			// 				id: req.params.id
			// 			},
			// 			attributes: ['id',
			// 				'content',
			// 				'title',
			// 				'created_at'
			// 			],
			// 			include: [{
			// 					model: User,
			// 					attributes: ['username']
			// 				},
			// 				{
			// 					model: Comment,
			// 					attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
			// 					include: {
			// 						model: User,
			// 						attributes: ['username']
			// 					}
			// 				}
			// 			]
			// 		})
			// 		.then(dbPostData => {
			// 			if (!dbPostData) {
			// 				res.status(404).json({
			// 					message: 'No post found with this id'
			// 				});
			// 				return;
			// 			}
			// 			res.json(dbPostData);
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 			res.status(500).json(err);
			// 		});
			// });

			// router.post('/', withAuth, (req, res) => {
			// 	Post.create({
			// 			title: req.body.title,
			// 			content: req.body.content,
			// 			user_id: req.session.user_id
			// 		})
			// 		.then(dbPostData => res.json(dbPostData))
			// 		.catch(err => {
			// 			console.log(err);
			// 			res.status(500).json(err);
			// 		});
			// });

			// router.put('/:id', withAuth, (req, res) => {
			// 	Post.update({
			// 			title: req.body.title,
			// 			content: req.body.content
			// 		}, {
			// 			where: {
			// 				id: req.params.id
			// 			}
			// 		}).then(dbPostData => {
			// 			if (!dbPostData) {
			// 				res.status(404).json({
			// 					message: 'No post found with this id'
			// 				});
			// 				return;
			// 			}
			// 			res.json(dbPostData);
			// 		})
			// 		.catch(err => {
			// 			console.log(err);
			// 			res.status(500).json(err);
			// 		});
			// });
			// router.delete('/:id', withAuth, (req, res) => {
			// 	Post.destroy({
			// 		where: {
			// 			id: req.params.id
			// 		}
			// 	}).then(dbPostData => {
			// 		if (!dbPostData) {
			// 			res.status(404).json({
			// 				message: 'No post found with this id'
			// 			});
			// 			return;
			// 		}
			// 		res.json(dbPostData);
			// 	}).catch(err => {
			// 		console.log(err);
			// 		res.status(500).json(err);
			// 	});
			// });

			module.exports = router;