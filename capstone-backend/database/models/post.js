const Sequelize = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastUpdated: {
		type: Sequelize.STRING,
		allowNull: false
	},
	replies: {
		type: Sequelize.ARRAY(Sequelize.JSON),
		allowNull: true
	}
});

module.exports = Post;
