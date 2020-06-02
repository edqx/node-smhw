const Submission = require("./Submission.js");

const HomeworkSubmissionVersion = require("./HomeworkSubmissionVersion.js");
const HomeworkSubmissionComment = require("./HomeworkSubmissionComment.js");

/**
 * Represents a homework submission on SMHW.
 * @extends {Submission}
 */
class HomeworkSubmission extends Submission {
    /**
     * Instantiate a HomeworkSubmission object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);

        /**
         * Whether or not the homework submission is marked as complete.
         * @type {Boolean}
         */
        this.completed = response.completed;

        /**
         * The ID of the current homework submission version.
         * @type {Number}
         */
        this.current_submission_version_id = response.current_submission_version_id;

        /**
         * Whether or not a grade has been given for the homework submission.
         * @type {Boolean}
         */
        this.grade_sent = response.grade_sent;

        /**
         * The comment made for the grade for the homework submission.
         * @type {String}
         */
        this.grading_comment = response.grading_comment;

        /**
         * The timestamp of when the homework submission was handed in.
         * @type {Number}
         */
        this.handed_in_on = new Date(response.handed_in_on).getTime();

        /**
         * Whether or not the homework submission has unread comments.
         * @type {Boolean}
         */
        this.has_unread_comments = response.has_unread_comments;

        /**
         * The ID of the homework that the homework submission is for.
         * @type {Number}
         */
        this.homework_id = response.homework_id;

        /**
         * Whether or not the homework submission has been marked.
         * @type {Boolean}
         */
        this.marked = response.marked;

        /**
         * Whether or not the homework submission is overdue.
         * @type {Boolean}
         */
        this.overdue = response.overdue;

        /**
         * An array of IDs to each homework submission version.
         * @type {Array<Number>}
         */
        this.version_ids = response.version_ids;

        /**
         * The type of assignment that the submission is for.
         * @type {String}
         */
        this.assignment_type = "homework";

        /**
         * The type of submission.
         * @type {String}
         */
        this.submission_type = "homework_submission";
    }

    /**
     * Get the homework that the homework submission is for.
     * @returns {Promise<Homework>}
     */
    getHomework() {
        return this._client.getHomework(this.homework_id);
    }

    /**
     * Get homework submission versions for the homework submission.
     * @param {Array<Number>} [ids] An array of IDs of homework versions to retrieve.
     * @returns {Promise<Array<HomeworkSubmissionVersion>>}
     */
    getVersions(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/homework_submissions/" + this.id).then(response => {
                if (response.submission_versions) {
                    if (ids) {
                        var submission_versions = response.submission_versions.filter(submission_version => ids.indexOf(submission_version.id) !== -1);

                        resolve(submission_versions.map(submission_version => new HomeworkSubmissionVersion(this._client, submission_version)));
                    } else {
                        resolve(response.submission_versions.map(submission_version => new HomeworkSubmissionVersion(this._client, submission_version)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }
    
    /**
     * Get an array comments made to the submission.
     * @param {Array<Number>} [ids] An array of IDs of the submission comments to retrieve.
     * @returns {Promise<Array<HomeworkSubmissionComment>>}
     */
    getComments(ids) {
        // Uses a "hack" here to get comments of another student's submissions,
        // as /api/submission_comments gives a 404 if none of the requested
        // IDs belong to a submission that belongs to the client user.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/homework_submissions/" + this.id).then(response => {
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

    /**
     * Post a comment on the submission from the client user.
     * @param {String} text The text of the comment.
     * @returns {Promise<HomeworkSubmissionComment>}
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
						submission_type: "HomeworkSubmission",
						text,
						updated_at: null,
						user_id: null,
						user_name: null,
						user_type: null
					}
                }
            }).then(response => {
                if (response.submission_comment) {
                    resolve(new HomeworkSubmissionComment(this._client, response.submission_comment));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
}

module.exports = HomeworkSubmission;