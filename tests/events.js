require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getOwnEvents({
        limit: 1,
        offset: 7
    }).then(events => {
        var event = events[0];
            
        event.getSubmissionComment().then(submission_comment => {
            console.log(submission_comment.text);
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log);