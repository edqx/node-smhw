/**
 * Represents an incomplete school from searching on SMHW.
 */
class SchoolIncomplete {
    /**
     * Instantiate a SchoolIncomplete object.
     * @param {Client} client The client that is instantiating this object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        this._client = client;

        /**
         * The ID of the school.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The name of the school.
         * @type {String}
         */
        this.name = response.name;
    }

    /**
     * Get a completed version of the object.
     * @returns {Promise<School>}
     */
    complete() {
        return this._client.getSchool(this.id);
    }
}

module.exports = SchoolIncomplete;