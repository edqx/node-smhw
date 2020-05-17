const HomeworkSubmissionVersion = require("./HomeworkSubmissionVersion.js");
const SubmissionComment = require("./SubmissionComment.js");
const SubmissionEvent = require("./SubmissionEvent.js");

/**
 * Represents a homework submission on SMHW.
 */
class HomeworkSubmission {
    /**
     * Instantiate a HomeworkSubmission object.
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
         * An array of IDs of comments posted on the homework submission.
         * @type {Array<Number>}
         */
        this.comment_ids = response.comment_ids;

        /**
         * Whether or not the homework submission is marked as complete.
         * @type {Boolean}
         */
        this.completed = response.completed;

        /**
         * The timestamp of when the homework submission was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The ID of the current homework submission version.
         * @type {Number}
         */
        this.current_submission_version_id = response.current_submission_version_id;

        /**
         * An array of IDs of events relating to the homework submission.
         * @type {Array<Number>}
         */
        this.event_ids = response.event_ids;

        /**
         * The grade recieved for the homework submission.
         * @type {String}
         */
        this.grade = response.grade;

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
         * The ID of the homework submission.
         * @type {String}
         */
        this.id = response.id;

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
         * The status of the homework submission.
         * @type {String}
         */
        this.status = response.status;

        /**
         * The avatar URL of the student who the homework submission belongs to.
         * @type {String}
         */
        this.student_avatar = response.student_avatar;

        /**
         * The ID of the student who the homework submission belongs to.
         * @type {Number}
         */
        this.student_id = response.student_id;

        /**
         * The name of the student who the homework submission belongs to.
         * @type {String}
         */
        this.student_name = response.student_name;

        /**
         * The timestamp of when the homework submission was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * An array of IDs to each homework submission version.
         * @type {Array<Number>}
         */
        this.version_ids = response.version_ids;
    }

    /**
     * Get comments made to the homework submission.
     * @param {Array<Number>} ids An array of IDs of the homework submission comments to retrieve.
     * @returns {Promise<Array<SubmissionComment>>}
     */
    getComments(ids) {
        // Uses a "hack" here to get comments of another student's submissions,
        // as /api/submission_comments gives a 404 if none of the requested
        // IDs belong to a submission that belongs to the client user.
        // Basically you re-retrieve the homework submission again except
        // you use response.submission_comments. You can also use this for
        // response.submission_events and response.submission_versions.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/homework_submissions/" + this.id).then(response => {
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
     * @param {Array<Number>} ids An array of IDs of submission events to retrieve.
     * @returns {Promise<Array<SubmissionEvent>>}
     */
    getEvents(ids) {
        // See the comment at HomeworkSubmission.getComments:ln.1 for information on this.
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/homework_submissions/" + this.id).then(response => {
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
     * Get homework submission versions for the homework submission.
     * @param {Array<Number>} ids An array of IDs of homework versions to retrieve.
     * @returns {Promise<Array<HomeworkSubmissionVersion>>}
     */
    getVersions(ids) {
        // See the comment at HomeworkSubmission.getComments:ln.1 for information on this.
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
     * Get the homework that the homework submission is for.
     * @returns {Promise<Homework>}
     */
    getHomework() {
        return this._client.getHomework(this.homework_id);
    }

    /**
     * Get the student who submitted the homework submission.
     * @returns {Promise<HomeworkSubmission>}
     */
    getStudent() {
        return this._client.getStudent(this.student_id);
    }
}

module.exports = HomeworkSubmission;