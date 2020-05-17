/**
 * Represents a class year on SMHW.
 */
class ClassYear {
    /**
     * Instantiate a ClassYear object.
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
         * Whether or not the class year is active.
         * @type {Boolean}
         */
        this.active = response.active;

        /**
         * An array of class groups IDs in the class year.
         * @type {Array<Number>}
         */
        this.class_group_ids = response.class_group_ids;

        /**
         * The timestamp of when the class year was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * Whether or not the class year has students.
         * @type {Boolean}
         */
        this.has_students = response.has_students;

        /**
         * The ID of the class year.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The name of the class year.
         * @type {String}
         */
        this.name = response.name;

        /**
         * The position of the class year in the school.
         * @type {Number}
         */
        this.position = response.position;

        /**
         * The ID of the school that the class year belongs to.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The timestamp of when the class year was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The ID of the class year.
         * @type {Number}
         */
        this.id = response.id;
    }
    
    /**
     * Get the school that the class year belongs to.
     * @returns {Promise<School>}
     */
    getSchool() {
        return this._client.getSchool(this.school_id);
    }
}

module.exports = ClassYear;