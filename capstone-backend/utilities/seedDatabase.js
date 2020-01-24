const { User, Post } = require("../database/models");

const seedDatabase = async () => {
	try {
		await Promise.all([
			User.create({
				name: "Kun Yu",
				email: "kun@gmail.com",
				password: "pass"
			}),
			User.create({
				name: "Jordan Yaqoob",
				email: "jordan@gmail.com",
				password: "pass"
			})
		]);
		await Post.create({
			title: "first post",
			lastUpdated: "yesterday",
			replies: [{'title':'first comment', 'threadId':1, 'userId':1},{'title':'second comment', 'threadId':1, 'userId':2}],
			userId: 2
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = seedDatabase;
