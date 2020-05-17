require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    console.log("Logged in as " + client.student.forename + " " + client.student.surname + " (" + client.user.uid + ")");
}).catch(console.log);