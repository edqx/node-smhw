require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getHomework(46997064).then(homework => {
		homework.getSubmissionComments().then(console.log);
	}).catch(console.log);
}).catch(console.log)