require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

function getRandomFloat(min, max) {
return Math.random() * (max - min) + min;
}       

const current_attempt = 1
const correct_chances = [0, 0.65, 0.90, 1.00];
client.login(process.env.SCHOOL_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getQuiz(process.env.QUIZ_ID).then(quiz => {
        quiz.getSubmission().then(quiz_submission => {
            quiz_submission.getQuestions().then(async questions => {
                for await (let i of {
                    [Symbol.asyncIterator]() {
                        return {
                            index: 0,
                            next() {
                                return new Promise((resolve, reject) => {
                                    if (this.index < questions.length) {
                                        questions[this.index++].beginAnswer(current_attempt).then(b_question => {
                                            console.log("Answering question \"" + b_question.description + "\"..");

                                            setTimeout(() => {
                                                const options = b_question.options.slice();
                                                var answer = "";

                                                options.unshift(options.splice(options.indexOf(b_question.correct_answer), 1));

                                                if (Math.random() < correct_chances[current_attempt]) {
                                                    answer = b_question.correct_answer;
                                                } else {
                                                    answer = b_question.options[Math.floor((Math.random() * (b_question.options.length - 1)) + 1)];
                                                }

                                                console.log(answer);

                                                b_question.submitAnswer(current_attempt, b_question.correct_answer).then(a_question => {
                                                    console.log("Answered question with answer " + a_question.correct_answer + ".\n\n");

                                                    setTimeout(() => {
                                                        resolve({
                                                            value: a_question.correct_answer,
                                                            done: false
                                                        });
                                                    }, getRandomFloat(2500, 5000));
                                                }).catch(console.log);
                                            }, getRandomFloat(5000, 10000));
                                        }).catch(e => {
                                            resolve({
                                                value: "",
                                                done: false
                                            });
                                        });
                                    } else {
                                        resolve({
                                            done: true
                                        });
                                    }
                                });
                            }
                        }
                    }
                });
            }).catch(console.log);
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log);