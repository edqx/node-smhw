/**
 * Represents a class group on SMHW.
 */
class ClassGroup {
    /**
     * Instantiate a ClassGroup object.
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
         * The ID of the academic year that the class group is in.
         * @type {Number}
         */
        this.academic_year_id = response.academic_year_id;

        /**
         * The class year that the class group is in.
         * @type {String}
         */
        this.class_year = response.class_year;

        /**
         * The ID of the class group
         * @type {Number}
         */
        this.id = response.id;

        /**
         * Whether or not the class group has been imported via sims.
         * @type {Boolean}
         */
        this.imported_via_sims = response.imported_via_sims;

        /**
         * Whether or not the class group is a registration group.
         * @type {Boolean}
         */
        this.is_registration_group = response.is_registration_group;

        
        /**
         * The timestamp of when the class group left. (?)
         * @type {Number}
         */
        this.left_at = new Date(response.left_at).getTime();
        
        /**
         * Links for API resources for the class group.
         * @type {Object}
         */
        this.links = {
            /**
             * A link to the class group's assignments.
             * @type {String}
             */
            assignments: response.links.assignments
        };

        /**
         * The name of the class group.
         * @type {String}
         */
        this.name = response.name;
        
        /**
         * The ID of the school that the class group belongs to.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * An array of IDs for students in the class group.
         * @type {Array<Number>}
         */
        this.student_ids = response.student_ids;

        /**
         * An array of IDs for teachers in the class group.
         * @type {Array<Number>}
         */
        this.teacher_ids = response.teacher_ids;
    }

    /**
     * Get the school that the class group belongs to.
     * @returns {Promise<School>}
     */
    getSchool() {
        return this._client.getSchool(this.school_id);
    }

    /**
     * Get students in the class group.
     * @param {Array<Number>} ids An array of student IDs to retrieve.
     * @returns {Promise<Array<Student>>}
     */
    getStudents(ids) {
        this._client.getStudents(ids || this.student_ids);
    }

    /**
     * Get teachers in the class group.
     * @param {Array<Number>} ids An array of teacher IDs to retrieve.
     * @returns {Promise<Array<Employee>>}
     */
    getTeachers(ids) {
        return this._client.getEmployees(ids || this.teacher_ids);
    }
}

module.exports = ClassGroup;