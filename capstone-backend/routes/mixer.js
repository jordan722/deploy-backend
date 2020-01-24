const express = require("express");
const router = express.Router();
const mixerController = require("../controllers/mixer");

// GET api/mixer/streams?gameName
router.route("/streams").get(mixerController.getStreams);

// Export our router, so that it can be imported to construct our apiRouter;
module.exports = router;
