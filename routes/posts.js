const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GETS BACK ALL THE POSTS
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.json({ message: err });
	}
});

// SUBMIT A POST
router.post('/', async (req, res) => {
	const { title, description } = req.body;
	const post = new Post({
		title,
		description,
	});
	await post.save();
	res.json(post);
});

// GET SPECIFIC POST
router.get('/:postId', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

// DELETE POST
router.delete('/:postId', async (req, res) => {
	try {
		await Post.remove({ _id: req.params.postId });
		res.json('removed post');
	} catch (err) {
		res.json({ message: err });
	}
});

// UPDATE POST
router.patch('/:postId', async (req, res) => {
	try {
		await Post.updateOne(
			{ _id: req.params.postId },
			{ $set: { title: req.body.title } }
		);
		res.json('updated post');
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
