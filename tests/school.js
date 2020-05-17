require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

client.login(process.env.SCHOOl_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.school.getClassGroups().then(class_groups => {
        var class_10yMa1 = class_groups.filter(class_group => class_group.name === "10y/Ma1")[0];

        class_10yMa1.getTeachers().then(teachers => {
            teachers[0].getUser().then(console.log).catch(console.log);
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log)