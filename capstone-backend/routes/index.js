const express = require("express");
const router = express.Router();

// Subrouters;
const usersRouter = require("./users");
const twitchRouter = require("./twitch");
const rawgRouter = require("./rawg");
const mixerRouter = require("./mixer");
const youtubeRouter = require("./youtube");

const postRouter = require("./post")

const authRouter = require("./auth");


// Mount our subrouters to assemble our apiRouter;
router.use("/users", usersRouter);
router.use("/twitch", twitchRouter);
router.use("/rawg", rawgRouter);
router.use("/mixer", mixerRouter);
router.use("/youtube", youtubeRouter);

router.use("/posts", postRouter);

router.use("/auth", authRouter);


// Error handling middleware;
router.use((req, res, next) => {
	const error = new Error("Not Found, Please Check URL!");
	error.status = 404;
	next(error);
});

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;
