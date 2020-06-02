const Assignment = require("./Assignment.js");

const QuizQuestion = require("./QuizQuestion.js");
const QuizSubmission = require("./QuizSubmission.js");
const QuizSubmissionComment = require("./QuizSubmissionComment.js");

/**
 * Represents a quiz assignment on SMHW.
 * @extends Assignment
 */
class Quiz extends Assignment {
    /**
     * Instantiate a Quiz object.
     * @param {Client} client The client that is instantiating the object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);

        /**
         * Whether or not the quiz is to be answered by students.
         * @type {Boolean}
         */
        this.answered_by_students = response.answered_by_students;

        /**
         * Whether or not the quiz is completed.
         * @type {Boolean}
         */
        this.completed = response.completed;

        /**
         * An array of IDs to the questions in the quiz.
         * @type {Array<Number>}
         */
        this.question_ids = response.question_ids;

        /**
         * The time limit for each question in seconds.
         * @type {Number}
         */
        this.questions_time_limit = response.questions_time_limit;

        /**
         * Whether or not the quiz is in a random order.
         * @type {Boolean}
         */
        this.random_order = response.random_order;

        /**
         * The submission status of the quiz for the client user.
         * @type {String}
         */
        this.submission_status = response.submission_status;

        /**
         * The assignment type.
         * @type {String}
         */
        this.type = "quiz";
    }

    /**
     * Get the client user's submission to the quiz.
     * @returns {Promise<QuizSubmission>}
     */
    getSubmission() {
        return this._client.getQuizSubmission(this.id + "-" + this._client.user.id);
    }

    /**
     * Get submissions to the quiz.
     * @param {Array<Number>} [ids] The IDs of the quiz submissions to retrieve.
     * @returns {Promise<Array<QuizSubmission>>}
     */
    getSubmissions(ids) {
        return this._client.getQuizSubmissions(ids || this.submission_ids);
    }
    
    /**
     * Get an array of questions on the Quiz.
     * @param {Array<Number>} [ids] The IDs of the quiz questions to retrieve.
     * @returns {Promise<Array<QuizQuestion>>}
     */
    getQuestions(ids) {
        return this._client.getQuizQuestions(ids || this.question_ids);
    }

    /**
     * Get comments made on the quiz's submissions.
     * @param {Array<Number>} [ids] The IDs of the submission comments to retrieve.
     * @returns {Promise<Array<QuizSubmissionComment>>}
     */
    getSubmissionComments(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/quiz_submissions", {
                query: {
                    ids: this.submission_ids
                }
            }).then(response => {
                if (response.submission_comments) {
                    if (ids) {
                        var submission_comments = response.submission_comments.filter(submission_comment => ids.indexOf(submission_comment.id) !== -1);

                        resolve(submission_comments.map(submission_comment => new QuizSubmissionComment(this._client, submission_comment)));
                    } else {
                        resolve(response.submission_comments.map(submission_comment => new QuizSubmissionComment(this._client, submission_comment)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }
}

module.exports = Quiz;