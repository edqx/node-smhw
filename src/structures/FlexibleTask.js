const WebLink = require("./WebLink.js");

/**
 * Represents a flexible task assignment on SMHW.
 */
class FlexibleTask {
    /**
     * Istantiate a FlexibleTask object.
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
         * An array of IDs for attachments attached to the flexible task.
         * @type {Array<Number>}
         */
        this.attachment_ids = response.attachment_ids;

        /**
         * @type {Array<Number>}
         */
        this.bookstore_content_ids = response.bookstore_content_ids;

        /**
         * The ID of the class group that the flexible task was set for.
         * @type {Number}
         */
        this.class_group_id = response.class_group_id;

        /**
         * The name of the class group that the flexible task was set for.
         * @type {String}
         */
        this.class_group_name = response.class_group_name;

        /**
         * The class year that the flexible task was set for.
         * @type {String}
         */
        this.class_year = response.class_year;

        /**
         * The ID of the flexible task community resource.
         * @type {Number}
         */
        this.community_resource_item_id = response.community_resource_item_id;

        /**
         * The timestamp of when the flexible task was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The description of the flexible task.
         * @type {String}
         */
        this.description = response.description;

        /**
         * The timestamp of when the flexible task is due.
         * @type {Number}
         */
        this.due_on = new Date(response.due_on).getTime();

        /**
         * The duration of the flexible task.
         * @type {String}
         */
        this.duration = response.duration;

        /**
         * The duration units of the flexible task.
         * @type {String}
         */
        this.duration_units = response.duration_units;

        /**
         * Whether or not the flexible task has unread comments.
         * @type {Boolean}
         */
        this.has_unread_comments = response.has_unread_comments;

        /**
         * The ID of the flexible task.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The timestamp of when the flexible task was issued.
         * @type {Number}
         */
        this.issued_on = new Date(response.issued_on).getTime();

        /**
         * The ID of the marking scheme used for the flexible task.
         * @type {Number}
         */
        this.marking_scheme_id = response.marking_scheme_id;

        /**
         * The timestamp of when the flexible task was published.
         * @type {Number}
         */
        this.published_at = new Date(response.published_at).getTime();

        /**
         * The purpose of the flexible task.
         * @type {String}
         */
        this.purpose = response.purpose;

        /**
         * The ID of the school that the flexible task is set for.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The logo URL of of the school that the flexible task is set for.
         * @type {String}
         */
        this.school_logo_url = response.school_logo_url;
        
        /**
         * The name of the school that the flexible task is set for.
         * @type {String}
         */
        this.school_name = response.school_name;

        /**
         * The subject of the flexible task.
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
         * The name of the submission method to use.
         * @type {String}
         */
        this.submission_type = response.submission_type;

        /**
         * The ID of the teacher who set the flexible task.
         * @type {Number}
         */
        this.teacher_id = response.teacher_id;

        /**
         * The name of the teacher who set the flexible task.
         * @type {String}
         */
        this.teacher_name = response.teacher_name;

        /**
         * The title of the flexible task.
         * @type {String}
         */
        this.title = response.title;

        /**
         * The timestamp of when the flexible task was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * An array of links to web resources for the flexible task.
         * @type {Array<String>}
         */
        this.web_links = response.web_links.map(web_link => new WebLink(web_link));
    }

    

    /**
     * Get attachments on the flexible task.
     * @param {Array<Number>} [ids] The IDs of the attachments to retrieve.
     * @returns {Promise<Attachment>}
     */
    getAttachments(ids) {
        return this._client.getAttachments(ids || this.attachment_ids);
    }

    /**
     * Get the teacher who set the flexible task.
     * @returns {Promise<Employee>}
     */
    getTeacher() {
        return this._client.getEmployee(this.teacher_id);
    }

    /**
     * Get the client user's submission to the flexible task.
     * @returns {Promise<FlexibleTaskSubmission>}
     */
    getSubmission() {
        return this._client.getFlexibleTaskSubmission(this.id + "-" + this._client.user.id);
    }

    /**
     * Get submissions to the flexible task.
     * @param {Array<Number>} [ids] The IDs of the flexible task submissions to retrieve.
     * @returns {Promise<Array<FlexibleTaskSubmissions>>}
     */
    getSubmissions(ids) {
        return this._client.getFlexibleTaskSubmissions(ids || this.submission_ids);
    }

    /**
     * Get comments made on flexible task submissions.
     * @param {Array<Number>} [ids] The IDs of the flexible task comments to retrieve.
     * @returns {Promise<Array<SubmissionComment>>}
     */
    getSubmissionComments(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/flexible_task_submissions", {
                query: {
                    ids: this.submission_ids
                }
            }).then(response => {
                if (response.submission_comments) {
                    if (ids) {
                        var submission_comments = response.submission_comments.filter(submission_comment => ids.indexOf(submission_comment.id) !== -1);

                        resolve(submission_comments.map(submission_comment => new SubmissionComment(this._client, submission_comment)));
                    } else {
                        resolve(response.submission_comments.map(submission_comment => new SubmissionComment(this._client, submission_comment)));
                    }
                } else {
                    reject(response);
                }
            });
        });
    }
}

module.exports = FlexibleTask;