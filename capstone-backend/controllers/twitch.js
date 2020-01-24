const axios = require("axios");

const TWITCH_API_KEY = process.env.TWITCH_API_KEY;

const twitchController = {
	getStreams: getStreams
};

// GET api/twitch/streams?gameName
async function getStreams(req, res, next) {
	try {
		// Search api for id, name and box art
		// using v5 api because new api requires exact match
		let info = await axios({
			method: "get",
			url: "https://api.twitch.tv/kraken/search/games",
			params: { query: req.query.gameName, live: true },
			headers: {
				"Client-ID": TWITCH_API_KEY,
				Accept: "application/vnd.twitchtv.v5+json"
			}
		});
		if (info.data.games === null) {
			res.status(404).json("Game not found - Twitch");
			return;
		}
		info = info.data.games[0];

		let response = {
			id: info._id,
			name: info.name,
			box_art_url: info.box.template
		};

		// Get streams for game
		let streams = await axios({
			method: "get",
			url: "https://api.twitch.tv/helix/streams",
			params: { game_id: info._id },
			headers: {
				"Client-ID": TWITCH_API_KEY
			}
		});
		if (streams.data.data.length === 0) {
			response.streams = null;
			res.status(404).json(response);
			return;
		}

		streams = streams.data.data.slice(0, 10).map(stream => {
			return {
				user_name: stream.user_name,
				title: stream.title,
				thumbnail_url: stream.thumbnail_url,
				external_link: `https://www.twitch.tv/${stream.user_name}`
			};
		});

		response.streams = streams;

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
	}
}

module.exports = twitchController;
