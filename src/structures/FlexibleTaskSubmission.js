const Submission = require("./Submission.js");

const FlexibleTaskSubmissionComment = require("./FlexibleTaskSubmissionComment.js");
const SubmissionEvent = require("./SubmissionEvent.js");

/**
 * Represents a flexible task submission on SMHW.
 * @extends {Submission}
 */
class FlexibleTaskSubmission extends Submission {
    /**
     * Instantiate a FlexibleTaskSubmission object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);

        /**
         * Whether or not the flexible task submission is marked as complete.
         * @type {Boolean}
         */
        this.completed = response.completed;

        /**
         * The ID of the current flexible task submission version.
         * @type {Number}
         */
        this.current_submission_version_id = response.current_submission_version_id;

        /**
         * Whether or not a grade has been given for the flexible task submission.
         * @type {Boolean}
         */
        this.grade_sent = response.grade_sent;

        /**
         * The comment made for the grade for the flexible task submission.
         * @type {String}
         */
        this.grading_comment = response.grading_comment;

        /**
         * The timestamp of when the flexible task submission was handed in.
         * @type {Number}
         */
        this.handed_in_on = new Date(response.handed_in_on).getTime();

        /**
         * Whether or not the flexible task submission has unread comments.
         * @type {Boolean}
         */
        this.has_unread_comments = response.has_unread_comments;

        /**
         * The ID of the flexible task that the flexible task submission is for.
         * @type {Number}
         */
        this.flexible_task_id = response.flexible_task_id;

        /**
         * Whether or not the flexible task submission has been marked.
         * @type {Boolean}
         */
        this.marked = response.marked;

        /**
         * Whether or not the flexible task submission is overdue.
         * @type {Boolean}
         */
        this.overdue = response.overdue;
        
        /**
         * An array of IDs to each flexible task submission version.
         * @type {Array<Number>}
         */
        this.version_ids = response.version_ids;

        /**
         * The type of assignment that the submission is for.
         * @type {String}
         */
        this.assignment_type = "flexible_task";

        /**
         * The type of submission.
         * @type {String}
         */
        this.submission_type = "flexible_task_submission";
    }

    /**
     * Get the flexible task that the flexible task submission is for.
     * @returns {Promise<FlexibleTask>}
     */
    getFlexibleTask() {
        return this._client.getFlexibleTask(this.flexible_task_id);
    }
    
    /**
     * Get an array comments made to the submission.
     * @param {Array<Number>} [ids] An array of IDs of the submission comments to retrieve.
     * @returns {Promise<Array<FlexibleTaskSubmissionComment>>}
     */
    getComments(ids) {
        // Uses a "hack" here to get comments of another student's submissions,
        // as /api/submission_comments gives a 404 if none of the requested
        // IDs belong to a submission that belongs to the client user.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/flexible_task_submissions/" + this.id).then(response => {
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

    /**
     * Post a comment on the submission from the client user.
     * @param {String} text The text of the comment.
     * @returns {Promise<FlexibleTaskSubmissionComment>}
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
						submission_type: "FlexibleTaskSubmission",
						text,
						updated_at: null,
						user_id: null,
						user_name: null,
						user_type: null
					}
                }
            }).then(response => {
                if (response.submission_comment) {
                    resolve(new FlexibleTaskSubmissionComment(this._client, response.submission_comment));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
}

module.exports = FlexibleTaskSubmission;