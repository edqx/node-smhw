const QuizSubmissionQuestionAttempt = require("./QuizSubmissionQuestionAttempt.js");

/**
 * Represents a submission question on a quiz on SMHW.
 */
class QuizSubmissionQuestion {
    /**
     * Instantiate a QuizSubmissionQuestion object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        /**
         * The client that instantiated this object.
         * @type {Client}
         * @private
         */
        this._client = client;

        /**
         * The first attempt at the question.
         * @type {QuizSubmissionQuestionAttempt}
         */
        this.attempt1 = response.attempt1 ? new QuizSubmissionQuestionAttempt(client, response.attempt1) : null;

        /**
         * The second attempt at the question.
         * @type {QuizSubmissionQuestionAttempt}
         */
        this.attempt2 = response.attempt2 ? new QuizSubmissionQuestionAttempt(client, response.attempt2) : null;
        
        /**
         * The second attempt at the question.
         * @type {QuizSubmissionQuestionAttempt}
         */
        this.attempt3 = response.attempt3 ? new QuizSubmissionQuestionAttempt(client, response.attempt3) : null;

        /**
         * The correct answer to the question.
         * @type {String}
         */
        this.correct_answer = response.correct_answer;
        
        /**
         * The current at the question.
         * @type {Number|null}
         */
        this.current_attempt = response.attempt1 ? (response.attempt2 ? (response.attempt3 ? null : 3) : 2) : 1;
        /**
         * The description of the question.
         * @type {String}
         */
        this.description = response.description;
        
        /**
         * The ID of the question.
         * @type {String}
         */
        this.id = response.id;

        /**
         * The image URL of the question.
         * @type {String}
         */
        this.image = response.image;

        /**
         * The different options to choose from.
         * @type {Array<String>}
         */
        this.options = response.options;

        /**
         * The ID of the question.
         * @type {Number}
         */
        this.quiz_question_id = response.quiz_question_id;
    }

    /**
     * Get the question on the quiz.
     * @returns {Promise<QuizQuestion>}
     */
    getQuestion() {
        return this._client.getQuizQuestion(this.quiz_question_id);
    }

    /**
     * Begin answering the question.
     * @param {Number} attempt The attempt to begin.
     * @param {Date} [date] The date of when to begin the question.
     * @returns {Promise<QuizSubmissionQuestion>}
     */
    beginAnswer(attempt, date = new Date) {
        return new Promise((resolve, reject) => {
            if (this["attempt" + attempt]) {
                return reject("Quiz submission question attempt already started.");
            }

            this["attempt" + attempt] = new QuizSubmissionQuestionAttempt(this._client, {
                start: date.toISOString(),
                answer: null,
                correct: false
            });

            this._client.make("PUT", "/api/quiz_submission_questions/" + this.id, {
                payload: {
                    quiz_submission_question: {
                        image: this.image,
                        options: this.options,
                        description: this.description,
                        attempt1: this.attempt1 ? {
                            start: this.attempt1.start,
                            answer: this.attempt1.answer,
                            correct: this.attempt1.correct
                        } : null,
                        attempt2: this.attempt2 ? {
                            start: this.attempt2.start,
                            answer: this.attempt2.answer,
                            correct: this.attempt2.correct
                        } : null,
                        attempt3: this.attempt3 ? {
                            start: sthis.attempt3.start,
                            answer: this.attempt3.answer,
                            correct: this.attempt3.correct
                        } : null,
                        quiz_question_id: this.quiz_question_id
                    }
                }
            }).then(response => {
                if (response.quiz_submission_question) {
                    resolve(new QuizSubmissionQuestion(this._client, response.quiz_submission_question));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Submit an answer to the question. Make sure to use .beginQuestion before this.
     * @param {Number} attempt The attempt to begin.
     * @param {String|Number} answer The answer to give to the question.
     */
    submitAnswer(attempt, answer) {
        return new Promise((resolve, reject) => {
            if (this["attempt" + attempt] && this["attempt" + attempt].answer) {
                return reject("Quiz submission question attempt already answered.");
            }

            this["attempt" + attempt] = new QuizSubmissionQuestionAttempt(this._client, {
                start: this["attempt" + attempt].start,
                answer: answer,
                correct: false
            });

            if (typeof answer === "number") {
                answer = this.options[answer];
            }

            this._client.make("PUT", "/api/quiz_submission_questions/" + this.id, {
                payload: {
                    quiz_submission_question: {
                        image: this.image,
                        options: this.options,
                        description: this.description,
                        attempt1: this.attempt1 ? {
                            start: this.attempt1.start,
                            answer: this.attempt1.answer,
                            correct: this.attempt1.correct
                        } : null,
                        attempt2: this.attempt2 ? {
                            start: this.attempt2.start,
                            answer: this.attempt2.answer,
                            correct: this.attempt2.correct
                        } : null,
                        attempt3: this.attempt3 ? {
                            start: sthis.attempt3.start,
                            answer: this.attempt3.answer,
                            correct: this.attempt3.correct
                        } : null,
                        quiz_question_id: this.quiz_question_id
                    }
                }
            }).then(response => {
                if (response.quiz_submission_question) {
                    this["attempt" + attempt].correct = response.quiz_submission_question["attempt" + attempt].correct;

                    resolve(new QuizSubmissionQuestion(this._client, response.quiz_submission_question));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
}

module.exports = QuizSubmissionQuestion;