const SubmissionComment = require("./SubmissionComment.js");
const SubmissionEvent = require("./SubmissionEvent.js");

/**
 * Represents an Event on SMHW.
 */
class ClientEvent {
    /**
     * Instantiate an Event object.
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
         * The ID of the assignment that the event refers to.
         * @type {Number}
         */
        this.assignment_id = response.assignment_id;

        /**
         * The title of the assignment that the event refers to.
         * @type {String}
         */
        this.assignment_title = response.assignment_title;

        /**
         * The type of the assignment that the event refers to.
         * @type {String}
         */
        this.assignment_type = response.assignment_type;

        /**
         * The timestamp of when the event was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The type of event.
         * @type {String}
         */
        this.event_type = response.event_type;

        /**
         * Information for what the event refers to.
         * @type {Object}
         */
        this.eventable = response.eventable;

        /**
         * The ID of the event.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The forename of the parent who the event refers to.
         * @type {String}
         */
        this.parent_forename = response.parent_forename;

        /**
         * The surname of the parent who the event refers to.
         * @type {String}
         */
        this.parent_surname = response.parent_surname;

        /**
         * Whether or not the event has been read as of yet.
         * @type {Boolean}
         */
        this.read = response.read;

        /**
         * The recipient of the event.
         * @type {Number}
         */
        this.recipient_id = response.recipient_id;

        /**
         * The forename of the student who the event refers to.
         * @type {String}
         */
        this.student_forename = response.student_forename;

        /**
         * The ID of the submission that the event refers to.
         * @type {Number}
         */
        this.submission_id = response.submission_id;

        /**
         * The ID of the user who created the event.
         * @type {Number}
         */
        this.user_id = response.user_id;

        /**
         * The name of the user who created the event.
         * @type {String}
         */
        this.user_name = response.user_name;
    }

    /**
     * Clear the event.
     * @returns {Promise<Event>}
     */
    clear() {
        return new Promise((resolve, reject) => {
            this._client.make("DELETE", "/api/events/" + this.id).then(() => {
                resolve(this);
            }).catch(reject);
        });
    }

    /**
     * Get the submission comment that the event refers to.
     * @returns {Promise<SubmissionComment>}
     */
    getSubmissionComment() {
        return this._client.getSubmissionComment(this.eventable.id);
    }

    /**
     * Get the submission event that the event refers to.
     * @returns {Promise<SubmissionEvent>}
     */
    getSubmissionEvent() {
        return this._client.getSubmissionEvent(this.eventable.id);
    }
}

module.exports = ClientEvent;