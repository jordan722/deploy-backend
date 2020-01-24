const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

// GET api/post
router.route("/").get(postController.getAllPosts);

// POST api/post
router.route("/").post(postController.addPost);

// GET api/post/:id
router.route("/:id").get(postController.getPost);

// PUT api/post/:id
router.route("/:id").put(postController.updatePost)


module.exports = router;
