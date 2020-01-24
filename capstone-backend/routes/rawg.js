const express = require("express");
const router = express.Router();
const rawgController = require("../controllers/rawg");

// GET api/rawg/trending
router.route("/trending").get(rawgController.getTrending);

// GET api/rawg/topRated
router.route("/topRated").get(rawgController.getTopRated);

// GET api/rawg/upcoming
router.route("/upcoming").get(rawgController.getUpcoming);

// GET api/rawg/:id
router.route("/:id").get(rawgController.getGameData);

// GET api/rawg/:id
router.route("/:id/reddit").get(rawgController.getGameReddit);

// GET api/rawg/:id
router.route("/:id/youtube").get(rawgController.getGameYoutube);

module.exports = router;
