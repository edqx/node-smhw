/**
 * Represents a homework submission version on SMHW.
 */
class HomeworkSubmissionVersion {
    /**
     * Instantiate a HomeworkSubmissionVersion object.
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
         * An array of IDs to attachments attached to the homework submission version.
         * @type {Array<Number>}
         */
        this.attachment_ids = response.attachment_ids;

        /**
         * The text submitted through online.
         * @type {String}
         */
        this.complete_online_text = response.complete_online_text;

        /**
         * The timestamp of when the homework submission version was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The ID of the homework submission version.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The timestamp of when the homework submission version was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * An array of IDs to attachments attached to the homework submission version.
         * @type {Array<Number>}
         */
        this.user_attachment_ids = response.user_attachment_ids;

        /**
         * The ID of the user who the version was created by.
         * @type {Number}
         */
        this.user_id = response.user_id;

        /**
         * The name of the user who the version was created by.
         * @type {String}
         */
        this.user_name = response.user_name;
    }
    
    /**
     * Get attachments attached to the homework submission version.
     * @param {Array<Number>} ids An array of IDs of attachments to retrieve.
     * @return {Promise<Array<Attachment>>}
     */
    getAttachments(ids) {
        return this._client.getAttachments(ids || this.attachment_ids);
    }

    /**
     * Get the user who created the homework submission version.
     * @return {Promise<User>}
     */
    getUser() {
        return this._client.getUser(this.user_id);
    }
}

module.exports = HomeworkSubmissionVersion;