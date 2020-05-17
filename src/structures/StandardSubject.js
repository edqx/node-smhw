/**
 * Represents a standard subject on SMHW.
 */
class StandardSubject {
    /**
     * Instantiate a StandardSubject object.
     * @param {Object} response The data for the object.
     */
    constructor(response) {
        /**
         * The ID of the standard subject.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The name of the standard subject.
         * @type {String}
         */
        this.name = response.name;
    }
}

module.exports = StandardSubject;