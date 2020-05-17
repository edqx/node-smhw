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
         * The assignment information of the submission comment.
         * @type {Object}
         */
        this.assignment = {
            /**
             * The type of assignment.
             * @type {String}
             */
            type: response.assignment.type,

            /**
             * The ID of the assignment.
             * @type {Number}
             */
            id: response.assignment.id
        };

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
         * The submission information of the submission comment.
         * @type {Object} 
         */
        this.submission = {
            /**
             * The type of submission.
             * @type {String}
             */
            type: response.submission.type,
            
            /**
             * The ID of the submission.
             * @type {String}
             */
            id: response.submission.id
        };

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