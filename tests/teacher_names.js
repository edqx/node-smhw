require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOL_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.student.getClassGroups().then(class_groups => {
        var teacher_ids = [];

        class_groups.forEach(class_group => {
            teacher_ids.push(class_group.teacher_ids[0]);
        });

        client.getUsers(teacher_ids).then(users => {
            console.log(users.map(user => user.forename + " " + user.surname));
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log);