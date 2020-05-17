require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getHomework(process.env.HOMEWORK_ID2).then(homework => {
        homework.getSubmissionComments().then(comments => {
            console.log(comments);
        });
    }).catch(console.log);
}).catch(console.log);