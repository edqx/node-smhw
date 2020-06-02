const SubmissionComment = require("./SubmissionComment.js");

/**
 * Represents a comment to a flexible task submission on SMHW.
 * @extends {SubmissionComment}
 */
class FlexibleTaskSubmissionComment extends SubmissionComment {
    /**
     * Instantiate a FlexibleTaskSubmissionComment object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);
    }

    /**
     * Get the assignment that the comment was posted to.
     * @type {FlexibleTask}
     */
    getAssignment() {
        return this._client.getFlexibleTask(this.assignment.id);
    }
    
    /**
     * Get the submission that the comment was posted to.
     * @type {FlexibleTaskSubmission}
     */
    getSubmission() {
        return this._client.getFlexibleTaskSubmission(this.submission.id);
    }
}

module.exports = FlexibleTaskSubmissionComment;