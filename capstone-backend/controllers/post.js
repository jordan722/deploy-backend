const { User, Post } = require("../database/models");

const postController = {
	getAllPosts: getAllPosts,
	addPost: addPost,
	getPost: getPost,
	updatePost: updatePost
};

// GET api/posts
async function getAllPosts(req, res, next) {
	try {
		const posts = await Post.findAll({ include: [User] });
		res.status(200).json(posts);
		console.log("attempting to find posts");
	} catch (err) {
		console.log(err);
	}
}

// POST api/posts
async function addPost(req, res, next) {
	try {
		const newPost = await Post.create(req.body);
		console.log("looking for post");
		res.status(201).json(newPost);
	} catch (err) {
		console.log(err);
	}
}

// GET api/post
async function getPost(req, res, next) {
	try {
		let post = await Post.findById(req.params.id, { include: [User] });
		if (post) {
			res.json(post);
		} else {
			res.status(404).send("Post not found");
		}
	} catch (err) {
		console.log(err);
	}
}

async function updatePost(req, res, next) {
	try {
		console.log("tried to update post");
		console.log(req.body);
		let updatedPostInfo = await Post.update(req.body, {
			where: { id: req.params.id },
			returning: true,
			plain: true
		});
		res.status(200).json(updatedPostInfo[1]);
	} catch (err) {
		next(err);
	}
}

module.exports = postController;
