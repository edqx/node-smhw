const User = require("./User.js");

/**
 * Represents an employee for a school on SMHW.
 */
class Employee {
    /**
     * Instantiate an Employee object.
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
         * The type of employee.
         * @type {String}
         */
        this.employee_type = response.employee_type;

        /**
         * The forename of the employee.
         * @type {String}
         */
        this.forename = response.forename;

        /**
         * The ID of the employee.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The ID of the school that the employee works for.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The surname of the employee.
         * @type {String}
         */
        this.surname = response.surname;

        /**
         * The title of the employee.
         * @type {String}
         */
        this.title = response.title;
    }

    /**
     * Get the user object of the employee.
     * @returns {Promise<User>}
     */
    getUser() {
        return this._client.getUser(this.id);
    }

    /**
     * Get the school that the employee works for.
     * @returns {Promise<School>}
     */
    getSchool() {
        return this._client.getSchool(this.school_id);
    }
}

module.exports = Employee;