require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getTask(45200797).then(function (task) {
        task.setCompleted(true).then(console.log).catch(console.log);
    }).catch(console.log);
}).catch(console.log);