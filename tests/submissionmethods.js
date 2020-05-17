require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getSubmissionMethods().then(submission_methods => {
        console.log(submission_methods.map(submission_method => submission_method.name + " (" + submission_method.id + ")"));
    }).catch(console.log);
}).catch(console.log)