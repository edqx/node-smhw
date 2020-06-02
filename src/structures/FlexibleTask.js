const Assignment = require("./Assignment.js");

const FlexibleTaskSubmissionComment = require("./FlexibleTaskSubmissionComment.js");

/**
 * Represents a flexible task assignment on SMHW.
 */
class FlexibleTask extends Assignment {
    /**
     * Istantiate a FlexibleTask object.
     * @param {Client} client The client that is instantiating the object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);

        /**
         * @type {Array<Number>}
         */
        this.bookstore_content_ids = response.bookstore_content_ids;

        /**
         * The duration of the flexible task.
         * @type {String}
         */
        this.duration = response.duration;

        /**
         * The duration units of the flexible task.
         * @type {String}
         */
        this.duration_units = response.duration_units;

        /**
         * The ID of the marking scheme used for the flexible task.
         * @type {Number}
         */
        this.marking_scheme_id = response.marking_scheme_id;

        /**
         * The name of the submission method to use.
         * @type {String}
         */
        this.submission_type = response.submission_type;
        
        /**
         * The assignment type.
         * @type {String}
         */
        this.type = "flexible_task";
    }

    /**
     * Get the client user's submission to the flexible task.
     * @returns {Promise<FlexibleTaskSubmission>}
     */
    getSubmission() {
        return this._client.getFlexibleTaskSubmission(this.id + "-" + this._client.user.id);
    }

    /**
     * Get submissions to the flexible task.
     * @param {Array<Number>} [ids] The IDs of the flexible task submissions to retrieve.
     * @returns {Promise<Array<FlexibleTaskSubmissions>>}
     */
    getSubmissions(ids) {
        return this._client.getFlexibleTaskSubmissions(ids || this.submission_ids);
    }

    /**
     * Get comments made on flexible task submissions.
     * @param {Array<Number>} [ids] The IDs of the submission comments to retrieve.
     * @returns {Promise<Array<FlexibleTaskSubmissionComment>>}
     */
    getSubmissionComments(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/flexible_task_submissions", {
                query: {
                    ids: this.submission_ids
                }
            }).then(response => {
                if (response.submission_comments) {
                    if (ids) {
                        var submission_comments = response.submission_comments.filter(submission_comment => ids.indexOf(submission_comment.id) !== -1);

                        resolve(submission_comments.map(submission_comment => new FlexibleTaskSubmissionComment(this._client, submission_comment)));
                    } else {
                        resolve(response.submission_comments.map(submission_comment => new FlexibleTaskSubmissionComment(this._client, submission_comment)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }
}

module.exports = FlexibleTask;