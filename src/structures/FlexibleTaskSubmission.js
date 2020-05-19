const SubmissionComment = require("./SubmissionComment.js");
const SubmissionEvent = require("./SubmissionEvent.js");

/**
 * Represents a flexible task submission on SMHW.
 */
class FlexibleTaskSubmission {
    /**
     * Instantiate a FlexibleTaskSubmission object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        /**
         * The client that instantiatied this client.
         * @type {Client}
         * @private
         */
        this._client = client;

        /**
         * An array of IDs of comments posted on the flexible task submission.
         * @type {Array<Number>}
         */
        this.comment_ids = response.comment_ids;

        /**
         * Whether or not the flexible task submission is marked as complete.
         * @type {Boolean}
         */
        this.completed = response.completed;

        /**
         * The timestamp of when the flexible task submission was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The ID of the current flexible task submission version.
         * @type {Number}
         */
        this.current_submission_version_id = response.current_submission_version_id;

        /**
         * An array of IDs of events relating to the flexible task submission.
         * @type {Array<Number>}
         */
        this.event_ids = response.event_ids;

        /**
         * The grade recieved for the flexible task submission.
         * @type {String}
         */
        this.grade = response.grade;

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
         * The ID of the flexible task submission.
         * @type {String}
         */
        this.id = response.id;

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
         * The status of the flexible task submission.
         * @type {String}
         */
        this.status = response.status;

        /**
         * The avatar URL of the student who the flexible task submission belongs to.
         * @type {String}
         */
        this.student_avatar = response.student_avatar;

        /**
         * The ID of the student who the flexible task submission belongs to.
         * @type {Number}
         */
        this.student_id = response.student_id;

        /**
         * The name of the student who the flexible task submission belongs to.
         * @type {String}
         */
        this.student_name = response.student_name;

        /**
         * The timestamp of when the flexible task submission was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * An array of IDs to each flexible task submission version.
         * @type {Array<Number>}
         */
        this.version_ids = response.version_ids;
    }

    /**
     * Get comments made to the flexible task submission.
     * @param {Array<Number>} [ids] An array of IDs of the flexible task submission comments to retrieve.
     * @returns {Promise<Array<SubmissionComment>>}
     */
    getComments(ids) {
        // See the comment at HomeworkSubmission.getComments:ln.1 for information on this.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/flexible task_submissions/" + this.id).then(response => {
                if (response.submission_comments) {
                    if (ids) {
                        var submission_comments = response.submission_comments.filter(submission_comment => ids.indexOf(submission_comment.id) !== -1);

                        resolve(submission_comments.map(submission_comment => new SubmissionComment(this._client, submission_comment)));
                    } else {
                        resolve(response.submission_comments.map(submission_comment => new SubmissionComment(this._client, submission_comment)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }

    /**
     * Get submission events that refer to this submission.
     * @param {Array<Number>} [ids] An array of IDs of submission events to retrieve.
     * @returns {Promise<Array<SubmissionEvent>>}
     */
    getEvents(ids) {
        // See the comment at HomeworkSubmission.getComments:ln.1 for information on this.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/flexible task_submissions/" + this.id).then(response => {
                if (response.submission_events) {
                    if (ids) {
                        var submission_events = response.submission_events.filter(submission_event => ids.indexOf(submission_event.id) !== -1);

                        resolve(submission_events.map(submission_event => new SubmissionEvent(this._client, submission_event)));
                    } else {
                        resolve(response.submission_events.map(submission_event => new SubmissionEvent(this._client, submission_event)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }

    /**
     * Get the flexible task that the flexible task submission is for.
     * @returns {Promise<FlexibleTask>}
     */
    getFlexibleTask() {
        return this._client.getFlexibleTask(this.flexible_task_id);
    }

    /**
     * Get the student who submitted the flexible task submission.
     * @returns {Promise<Student>}
     */
    getStudent() {
        return this._client.getStudent(this.student_id);
    }

    /**
     * Post a comment on the submission from the client user.
     * @param {String} text The text of the comment.
     * @returns {Promise<SubmissionComment>}
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
                    resolve(new SubmissionComment(this._client, response.submission_comment));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
}

module.exports = FlexibleTaskSubmission;