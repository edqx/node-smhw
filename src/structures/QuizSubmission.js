const Submission = require("./Submission.js");

const QuizSubmissionComment = require("./QuizSubmissionComment.js");
const QuizSubmissionQuestion = require("./QuizSubmissionQuestion.js");

/**
 * Represents a quiz submission on SMHW.
 * @extends {Submission}
 */
class QuizSubmission extends Submission {
    /**
     * Instantiate a QuizSubmission object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);

        /**
         * An array of submission question IDs.
         * @type {Array<Number>}
         */
        this.question_ids = response.question_ids;

        /**
         * The ID of the quiz that the quiz submission is for.
         * @type {Number}
         */
        this.quiz_id = response.quiz_id;

        /**
         * The type of assignment that the submission is for.
         * @type {String}
         */
        this.assignment_type = "quiz";

        /**
         * The type of submission.
         * @type {String}
         */
        this.submission_type = "quiz_submission";
    }

    /**
     * Get the quiz that the quiz submission is for.
     * @returns {Promise<Quiz>}
     */
    getQuiz() {
        return this._client.getQuiz(this.quiz_id);
    }

    /**
     * Get the questions for the quiz submission.
     * @param {Array<Number>} [ids] An array of IDs of quiz submission questions to retrieve.
     * @returns {Promise<Array<QuizSubmissionQuestion>>}
     */
    getQuestions(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/quiz_submission_questions", {
                query: {
                    ids: this.question_ids
                }
            }).then(response => {
                if (response.quiz_submission_questions) {
                    resolve(response.quiz_submission_questions.map(quiz_submission_question => new QuizSubmissionQuestion(this._client, quiz_submission_question)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
    
    /**
     * Get an array comments made to the submission.
     * @param {Array<Number>} [ids] An array of IDs of the submission comments to retrieve.
     * @returns {Promise<Array<QuizSubmissionComment>>}
     */
    getComments(ids) {
        // Uses a "hack" here to get comments of another student's submissions,
        // as /api/submission_comments gives a 404 if none of the requested
        // IDs belong to a submission that belongs to the client user.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/quiz_submissions/" + this.id).then(response => {
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
            }).catch(reject);
        });
    }

    /**
     * Post a comment on the submission from the client user.
     * @param {String} text The text of the comment.
     * @returns {Promise<QuizSubmissionComment>}
     */
    postComment(text) {
        return new Promise((resolve, reject) => {
            this._client.make("POST", "/api/submission_comments", {
                payload: {
                    submission_comment: {
						assignment_id: null,
						assignment_type: null,
						created_at: null,
						submission_id: this.id,
						submission_type: "QuizSubmission",
						text,
						updated_at: null,
						user_id: null,
						user_name: null,
						user_type: null
					}
                }
            }).then(response => {
                if (response.submission_comment) {
                    resolve(new QuizSubmissionComment(this._client, response.submission_comment));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
}

module.exports = QuizSubmission;