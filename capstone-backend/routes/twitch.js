const express = require("express");
const router = express.Router();
const twitchController = require("../controllers/twitch");

// GET api/twitch/streams?gameName
router.route("/streams").get(twitchController.getStreams);

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
