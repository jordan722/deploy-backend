// Here, we can prepare to register our models, set up associations between tables, and generate a barrel file for the models;

const User = require("./user");
const Post = require("./post")

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
	User,
	Post
};
