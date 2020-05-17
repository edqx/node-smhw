/**
 * Represents a submission method on SMHW.
 */
class SubmissionMethod {
    /**
     * Instantiate a SubmissionMethod object.
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
         * Whether or not the submission method is global across SMHW.
         * @type {Boolean}
         */
        this.global = response.global;

        /**
         * The ID of the submissiom method.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The name of the submission method.
         * @type {String}
         */
        this.name = response.name;

        /**
         * Whether or not the submission method involves a third party program or website.
         * @type {Boolean}
         */
        this.third_party_submission = response.third_party_submission;
    }
}

module.exports = SubmissionMethod;