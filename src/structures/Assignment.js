const WebLink = require("./WebLink.js");

/**
 * Represents a basic assignment on SMHW.
 */
class Assignment {
    /**
     * Instantiate an Assignment object.
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
         * An array of IDs for attachments attached to the assignment.
         * @type {Array<Number>}
         */
        this.attachment_ids = response.attachment_ids;

        /**
         * The ID of the class group that the assignment was set for.
         * @type {Number}
         */
        this.class_group_id = response.class_group_id;

        /**
         * The name of the class group that the assignment was set for.
         * @type {String}
         */
        this.class_group_name = response.class_group_name;

        /**
         * The class year that the assignment was set for.
         * @type {String}
         */
        this.class_year = response.class_year;

        /**
         * The ID of the assignment community resource.
         * @type {Number}
         */
        this.community_resource_item_id = response.community_resource_item_id;

        /**
         * The timestamp of when the assignment was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The description of the assignment.
         * @type {String}
         */
        this.description = response.description;

        /**
         * The timestamp of when the assignment is due.
         * @type {Number}
         */
        this.due_on = new Date(response.due_on).getTime();

        /**
         * The duration of the assignment.
         * @type {String}
         */
        this.duration = response.duration;

        /**
         * The duration units of the assignment.
         * @type {String}
         */
        this.duration_units = response.duration_units;

        /**
         * Whether or not the assignment has unread comments.
         * @type {Boolean}
         */
        this.has_unread_comments = response.has_unread_comments;

        /**
         * The ID of the assignment.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The timestamp of when the assignment was issued.
         * @type {Number}
         */
        this.issued_on = new Date(response.issued_on).getTime();

        /**
         * The timestamp of when the assignment was published.
         * @type {Number}
         */
        this.published_at = new Date(response.published_at).getTime();

        /**
         * The purpose of the assignment.
         * @type {String}
         */
        this.purpose = response.purpose;

        /**
         * The ID of the school that the assignment is set for.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The logo URL of of the school that the assignment is set for.
         * @type {String}
         */
        this.school_logo_url = response.school_logo_url;
        
        /**
         * The name of the school that the assignment is set for.
         * @type {String}
         */
        this.school_name = response.school_name;

        /**
         * The subject of the assignment.
         * @type {String}
         */
        this.subject = response.subject;

        /**
         * An array of IDs for submissions
         * @type {Array<Number>}
         */
        this.submission_ids = response.submission_ids;

        /**
         * The ID of the submission method to use.
         * @type {Number}
         */
        this.submission_method_id = response.submission_method_id;

        /**
         * The status of the submission for the client user.
         * @type {String}
         */
        this.submission_status = response.submission_status;

        /**
         * The ID of the teacher who set the assignment.
         * @type {Number}
         */
        this.teacher_id = response.teacher_id;

        /**
         * The name of the teacher who set the assignment.
         * @type {String}
         */
        this.teacher_name = response.teacher_name;

        /**
         * The title of the assignment.
         * @type {String}
         */
        this.title = response.title;

        /**
         * The timestamp of when the assignment was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();
        
        /**
         * An array of links to web resources for the assigment.
         * @type {Array<WebLink>}
         */
        this.web_links = response.web_links.map(web_link => new WebLink(web_link));
        
        /**
         * The assignment type.
         * @type {String}
         */
        this.type = "";
    }
    
    /**
     * Get attachments attached to the assignment.
     * @param {Array<Number>} [ids] The IDs of the attachments to retrieve.
     * @returns {Promise<Array<Attachment>>}
     */
    getAttachments(ids) {
        return this._client.getAttachments(ids || this.attachment_ids);
    }

    /**
     * Get the teacher who set the assignment.
     * @returns {Promise<Employee>}
     */
    getTeacher() {
        return this._client.getEmployee(this.teacher_id);
    }
}

module.exports = Assignment;