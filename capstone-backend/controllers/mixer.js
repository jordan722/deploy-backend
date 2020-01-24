const axios = require("axios");

const mixerController = {
	getStreams: getStreams
};

// GET api/mixer/streams?gameName
async function getStreams(req, res, next) {
	try {
		let info = await axios({
			method: "get",
			url: "https://mixer.com/api/v1/types",
			params: { query: req.query.gameName }
		});
		if (info.data.length === 0) {
			res.status(400).json("Game not found - Mixer");
			return;
		}
		info = info.data[0];
		info = {
			id: info.id,
			name: info.name,
			box_art_url: info.coverUrl
		};

		let response = {
			...info
		};

		let streams = await axios({
			method: "get",
			url: `https://mixer.com/api/v1/types/${info.id}/channels`,
			params: { order: "viewersCurrent:DESC" }
		});
		if (streams.data.length === 0) {
			response.streams = null;
			res.status(404).json(response);
			return;
		}

		streams = streams.data.slice(0, 10).map(stream => {
			return {
				user_name: stream.token,
				title: stream.name,
				thumbnail_url: `https://thumbs.mixer.com/channel/${stream.id}.small.jpg`,
				external_link: `https://www.mixer.com/${stream.token}`
			};
		});
		response.streams = streams;

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
	}
}

module.exports = mixerController;
