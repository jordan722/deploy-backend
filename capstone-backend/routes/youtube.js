const express = require("express");
const router = express.Router();
const youtubeController = require("../controllers/youtube");

// GET api/youtube/streams?gameName
router.route("/streams").get(youtubeController.getStreams);

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
