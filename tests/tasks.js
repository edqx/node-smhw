require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getTasks().then(function (tasks) {
        var overdue_tasks = tasks.filter(task => !task.completed && task.due_on < Date.now());

        console.log("You have " + overdue_tasks.length + " overdue tasks");
    }).catch(console.log);
}).catch(console.log);