const SubmissionComment = require("./SubmissionComment.js");

/**
 * Represents a comment to a homework submission on SMHW.
 * @extends {SubmissionComment}
 */
class HomeworkSubmissionComment extends SubmissionComment {
    /**
     * Instantiate a HomeworkSubmissionComment object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);
    }

    /**
     * Get the assignment that the comment was posted to.
     * @type {Homework}
     */
    getAssignment() {
        return this._client.getHomework(this.assignment.id);
    }
    
    /**
     * Get the submission that the comment was posted to.
     * @type {HomeworkSubmission}
     */
    getSubmission() {
        return this._client.getHomeworkSubmission(this.submission.id);
    }
}

module.exports = HomeworkSubmissionComment;