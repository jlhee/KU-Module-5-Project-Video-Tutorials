const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		imgUrl: { type: String, required: true },
		isPublic: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);

// module.exports = class Cube {
// 	constructor(name, description, imgURL, difficulty) {
// 		this.id = makeRandomNum(name);
// 		this.name = name;
// 		this.description = description;
// 		this.imgURL = imgURL;
// 		this.difficulty = difficulty;
// 	}
// };

// function makeRandomNum(string) {
// 	let sum = 0;
// 	for (let char of string) {
// 		sum += char.charCodeAt();
// 	}
// 	sum += parseInt(Math.random() * string.length);
// 	return sum;
// }
