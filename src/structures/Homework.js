const Assignment = require("./Assignment.js");

const HomeworkSubmissionComment = require("./HomeworkSubmissionComment.js");

/**
 * Represents a homework assignment on SMHW.
 */
class Homework extends Assignment {
    /**
     * Instantiate a Homework object.
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
         * The duration of the homework.
         * @type {String}
         */
        this.duration = response.duration;

        /**
         * The duration units of the homework.
         * @type {String}
         */
        this.duration_units = response.duration_units;
        /**
         * The ID of the marking scheme used for the homework.
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
        this.type = "homework";
    }

    /**
     * Get the client user's submission to the homework.
     * @returns {Promise<HomeworkSubmission>}
     */
    getSubmission() {
        return this._client.getHomeworkSubmission(this.id + "-" + this._client.user.id);
    }

    /**
     * Get submissions to the homework.
     * @param {Array<Number>} [ids] The IDs of the homework submissions to retrieve.
     * @returns {Promise<Array<HomeworkSubmissions>>}
     */
    getSubmissions(ids) {
        return this._client.getHomeworkSubmissions(ids || this.submission_ids);
    }

    /**
     * Get comments made on homework submissions.
     * @param {Array<Number>} [ids] The IDs of the submission comments to retrieve.
     * @returns {Promise<Array<HomeworkSubmissionComment>>}
     */
    getSubmissionComments(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/homework_submissions", {
                query: {
                    ids: this.submission_ids
                }
            }).then(response => {
                if (response.submission_comments) {
                    if (ids) {
                        var submission_comments = response.submission_comments.filter(submission_comment => ids.indexOf(submission_comment.id) !== -1);

                        resolve(submission_comments.map(submission_comment => new HomeworkSubmissionComment(this._client, submission_comment)));
                    } else {
                        resolve(response.submission_comments.map(submission_comment => new HomeworkSubmissionComment(this._client, submission_comment)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }
}

module.exports = Homework;