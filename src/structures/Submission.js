const SubmissionComment = require("./SubmissionComment.js");

/**
 * Represents a base submission on SMHW.
 */
class Submission {
    /**
     * Instantiate a Submission object.
     * @param {Client} client The client that is instantiating this objectg.
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
         * An array of IDs of comments posted to the submission.
         * @type {Array<Number>}
         */
        this.comment_ids = response.comment_ids;

        /**
         * The timestamp of when the submission was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * An array of IDs to events refering to the submission.
         * @type {Array<Number>}
         */
        this.event_ids = response.event_ids;

        /**
         * The grade recieved for the event.
         * @type {String}
         */
        this.grade = response.grade;

        /**
         * The ID of the submission.
         * @type {String}
         */
        this.id = response.id;
        
        /**
         * The status of the submission.
         * @type {String}
         */
        this.status = response.status;

        /**
         * The avatar URL of the student.
         * @type {String}
         */
        this.student_avatar = response.student_avatar;
        
        /**
         * The ID of the student.
         * @type {Number}
         */
        this.student_id = response.student_id;

        /**
         * The name of the student.
         * @type {String}
         */
        this.student_name = response.student_name;

        /**
         * The timestamp of when the submission was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The assignment type of the submission.
         * @type {String}
         */
        this.assignment_type = "";
    }
    
    /**
     * Get the student who submitted the flexible task submission.
     * @returns {Promise<Student>}
     */
    getStudent() {
        return this._client.getStudent(this.student_id);
    }

    /**
     * Get submission events that refer to this submission.
     * @param {Array<Number>} [ids] An array of IDs of submission events to retrieve.
     * @returns {Promise<Array<SubmissionEvent>>}
     */
    getEvents(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/" + this.assignment_type + "_submissions/" + this.id).then(response => {
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
}

module.exports = Submission;