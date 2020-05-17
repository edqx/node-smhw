const Employee = require("./Employee.js");

/**
 * Represents a submission event on SMHW.
 */
class SubmissionEvent {
    /**
     * Instantiate a SubmissionEvent object.
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
         * The content of the event.
         * @type {String}
         */
        this.content = response.content;

        /**
         * The timestamp of when the event was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The type of the submission event.
         * @type {String}
         */
        this.event_type = response.event_type;

        /**
         * The ID of the submission event.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The submission information of the submission event.
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
         * The ID of the submission.
         * @type {String}
         */
        this.submission_id = response.submission_id;

        /**
         * The ID of the teacher who created the event.
         * @type {Number}
         */
        this.teacher_id = response.teacher_id;

        /**
         * The timestamp of when the homework was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The name of the user who created the event.
         * @type {String}
         */
        this.user_name = response.user_name;
    }

    /**
     * Get the teacher who created the event.
     * @returns {Promise<Employee>}
     */
    getTeacher() {
        return this._client.getEmployee(this.teacher_id);
    }
}
module.exports = SubmissionEvent;