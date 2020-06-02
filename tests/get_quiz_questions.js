require("dotenv").config();

const SMHW = require("../index.js");
const client = new SMHW.Client();

function getRandomFloat(min, max) {
return Math.random() * (max - min) + min;
}       

const current_attempt = 3;
const correct_chances = [0, 0.65, 0.90, 1.00];
client.login(process.env.SCHOOL_ID, process.env.EMAIL, process.env.PASSWORD).then(() => {
    client.getQuiz(process.env.QUIZ_ID).then(quiz => {
        quiz.getSubmission().then(quiz_submission => {
            quiz_submission.getQuestions().then(async questions => {
				var correct = 0;
				
                for await (let i of {
                    [Symbol.asyncIterator]() {
                        return {
                            index: 0,
                            next() {
                                return new Promise((resolve, reject) => {
                                    if (this.index < questions.length) {
                                        questions[this.index++].beginAnswer(current_attempt).then(b_question => {
                                            console.log("(" + (this.index + 1) + "/" + questions.length + ") \"" + b_question.description + "\"");
											const chars = "abcdefghijklmnop";
											console.log(b_question.options.map((q, i) => "  " + chars[i] + ". " + q + (q === b_question.correct_answer ? " (*)" : "")).join("\n"));

                                            setTimeout(() => {
                                                const options = b_question.options.slice();
                                                var answer = "";

                                                options.unshift(options.splice(options.indexOf(b_question.correct_answer), 1));

                                                if (Math.random() < correct_chances[current_attempt]) {
                                                    answer = b_question.correct_answer;
                                                } else {
                                                    answer = b_question.options[Math.floor((Math.random() * (b_question.options.length - 1)) + 1)];
                                                }

                                                b_question.submitAnswer(current_attempt, answer).then(a_question => {
                                                    console.log("Answered question with " + answer + ".\n\n");
													
													if (answer === b_question.correct_answer) {
														correct++;
													}

                                                    setTimeout(() => {
                                                        resolve({
                                                            value: a_question.correct_answer,
                                                            done: false
                                                        });
                                                    }, getRandomFloat(100, 150));
                                                }).catch(console.log);
                                            }, getRandomFloat(500, 1000));
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
                }) {};
				
				console.log("Completed quiz with score " + correct + "/" + questions.length + " (" + ((correct / questions.length) * 100) + "%)");
            }).catch(console.log);
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log);