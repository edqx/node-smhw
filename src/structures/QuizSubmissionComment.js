const SubmissionComment = require("./SubmissionComment.js");

/**
 * Represents a comment to a homework submission on SMHW.
 * @extends {SubmissionComment}
 */
class QuizSubmissionComment extends SubmissionComment {
    /**
     * Instantiate a QuizSubmissionComment object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);
    }

    /**
     * Get the assignment that the comment was posted to.
     * @type {Quiz}
     */
    getAssignment() {
        return this._client.getQuiz(this.assignment.id);
    }
    
    /**
     * Get the submission that the comment was posted to.
     * @type {QuizSubmission}
     */
    getSubmission() {
        return this._client.getQuizSubmission(this.submission.id);
    }
}

module.exports = QuizSubmissionComment;