/**
 * Represents a comment on a submission on SMHW.
 */
class SubmissionComment {
    /**
     * Instantiate a SubmissionComment object.
     * @param {Client} client The client that is instantiating the object.
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
         * @typedef AssignmentInformation
         * @property {String} type The type of assignment.
         * @property {Number} id the ID of the assignment.
         */

        /**
         * The assignment information of the submission comment.
         * @type {AssignmentInformation}
         */
        this.assignment = response.assignment;

        /**
         * The ID of the assignment of the submission comment.
         * @type {Number}
         */
        this.assignment_id = response.assignment_id;

        /**
         * The timestamp of when the submission comment was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The ID of the submission comment.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The origin of the submission comment.
         * @type {String}
         */
        this.origin = response.origin;

        /**
         * The ID of the shared submission comment.
         * @type {Number}
         */
        this.shared_submission_comment_id = response.shared_submission_comment_id;

        /**
         * @typedef SubmissionInformation
         * @property {String} type The type of submission.
         * @property {String} id The ID of the submission.
         */
        
        /**
         * The submission information of the submission comment.
         * @type {SubmissionInformation} 
         */
        this.submission = response.submission;

        /**
         * The content of the submission comment.
         * @type {String}
         */
        this.text = response.text;

        /**
         * The timestamp of when the submission comment was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The ID of the user who posted the comment.
         * @type {Number}
         */
        this.user_id = response.user_id;

        /**
         * The name of the user who posted the comment.
         * @type {String}
         */
        this.user_name = response.user_name;

        /**
         * The type of assignment that the comment was posted on.
         * @type {String}
         */
        this.assignment_type = this.assignment.type;

        /**
         * The type of submission that the comment was posted on.
         * @type {String}
         */
        this.submission_type = this.submission.type;
    }

    /**
     * Get the user who posted the comment.
     * @returns {Promise<User>}
     */
    getUser() {
        return this._client.getUser(this.user_id);
    }
}

module.exports = SubmissionComment;