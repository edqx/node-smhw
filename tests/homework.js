require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOL_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getHomework(process.env.HOMEWORK_ID).then(homework => {
        homework.getTeacher().then(teacher => {
            teacher.getUser().then(user => {
                console.log(user.forename + " " + user.surname);
            });
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log);