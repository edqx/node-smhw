require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getHomework(process.env.HOMEWORK_ID2).then(homework => {
		homework.getSubmission().then(submission => {
			submission.postComment("this one doesnt need to be submitted does it?").then(console.log).catch(console.log);
		}).catch(console.log);
	}).catch(console.log);
}).catch(console.log)