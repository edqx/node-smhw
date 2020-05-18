const User = require("./User.js")

/**
 * Represents a student on SMHW.
 * @extends {User}
 */
class Student extends User {
    /**
     * Instantiate a Student object.
     * @param {Client} client The client that is instantiating the object.
     * @param {Object} response The data for the object.
     */
    constructor(client, response) {
        super(client, response);

        /**
         * An array of categories that the student falls into.
         * @type {Array<String>}
         */
        this.categories = response.categories;

        /**
         * An array of class group ids that the student is in.
         * @type {Array<Number>}
         */
        this.class_group_ids = response.class_group_ids;

        /**
         * The gender of the user.
         * @type {String}
         */
        this.gender = response.gender;

        /**
         * The invite code that the student used.
         * @type {String}
         */
        this.invite_code = response.invite_code;

        /**
         * The timestamp of when then invite code expires.
         * @type {Number}
         */
        this.invite_code_expires_on = new Date(response.invite_code_expires_on).getTime();

        /**
         * An array of IDs to the student's parents.
         * @type {Array<Number>}
         */
        this.parent_ids = response.parent_ids;

        /**
         * The ID of the registration group that the student belongs to.
         * @type {Number}
         */
        this.registration_group_id = response.registration_group_id;

        /**
         * An array of badge IDs that the student has.
         * @type {Array<Number>}
         */
        this.student_badge_ids = response.student_badge_ids;

        /**
         * An array of category IDs that the student falls into.
         * @type {Array<Number>}
         */
        this.student_category_ids = response.student_category_ids;

        /**
         * The ID of the student's praise summary.
         * @type {Number}
         */
        this.student_praise_summary_id = response.student_praise_summary_id;

        /**
         * The year that the student belongs to.
         * @type {String}
         */
        this.year = response.year;
    }

    /**
     * Get class groups that the student is in.
     * @param {Array<Number>} [ids] An array of class group IDs to retrieve.
     * @returns {Promise<Array<ClassGroup>>}
     */
    getClassGroups(ids) {
        return this._client.getClassGroups(ids || this.class_group_ids);
    }
}

module.exports = Student;