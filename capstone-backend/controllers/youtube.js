const axios = require("axios");

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const youtubeController = {
	getStreams: getStreams
};

// GET api/youtube/streams?gameName
async function getStreams(req, res, next) {
	try {
		let streams = await axios({
			method: "get",
			url: "https://www.googleapis.com/youtube/v3/search",
			params: {
				key: YOUTUBE_API_KEY,
				q: req.query.gameName,
				part: "snippet",
				maxResults: 10,
				eventType: "live",
				type: "video",
				order: "viewCount"
			}
		});
		if (streams.data.items.length === 0) {
			res.status(404).json("Game not found - Youtube");
			return;
		}

		streams = streams.data.items.map(stream => {
			return {
				user_name: stream.snippet.channelTitle,
				title: stream.snippet.title,
				thumbnail_url: stream.snippet.thumbnails.high.url,
				external_link: `https://www.youtube.com/watch?v=${stream.id.videoId}`
			};
		});

		res.status(200).json({ streams });
	} catch (err) {
		console.log(err);
	}
}

module.exports = youtubeController;
