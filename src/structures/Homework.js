const SubmissionComment = require("./SubmissionComment.js");
const WebLink = require("./WebLink.js");

/**
 * Represents a homework assignment on SMHW.
 */
class Homework {
    /**
     * Instantiate a Homework object.
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
         * An array of IDs for attachments attached to the homework.
         * @type {Array<Number>}
         */
        this.attachment_ids = response.attachment_ids;

        /**
         * @type {Array<Number>}
         */
        this.bookstore_content_ids = response.bookstore_content_ids;

        /**
         * The ID of the class group that the homework was set for.
         * @type {Number}
         */
        this.class_group_id = response.class_group_id;

        /**
         * The name of the class group that the homework was set for.
         * @type {String}
         */
        this.class_group_name = response.class_group_name;

        /**
         * The class year that the homework was set for.
         * @type {String}
         */
        this.class_year = response.class_year;

        /**
         * The ID of the homework community resource.
         * @type {Number}
         */
        this.community_resource_item_id = response.community_resource_item_id;

        /**
         * The timestamp of when the homework was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The description of the homework.
         * @type {String}
         */
        this.description = response.description;

        /**
         * The timestamp of when the homework is due.
         * @type {Number}
         */
        this.due_on = new Date(response.due_on).getTime();

        /**
         * The duration of the homework.
         * @type {String}
         */
        this.duration = response.duration;

        /**
         * The duration units of the homework.
         * @type {String}
         */
        this.duration_units = response.duration_units;

        /**
         * Whether or not the homework has unread comments.
         * @type {Boolean}
         */
        this.has_unread_comments = response.has_unread_comments;

        /**
         * The ID of the homework.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The timestamp of when the homework was issued.
         * @type {Number}
         */
        this.issued_on = new Date(response.issued_on).getTime();

        /**
         * The ID of the marking scheme used for the homework.
         * @type {Number}
         */
        this.marking_scheme_id = response.marking_scheme_id;

        /**
         * The timestamp of when the homework was published.
         * @type {Number}
         */
        this.published_at = new Date(response.published_at).getTime();

        /**
         * The purpose of the homework.
         * @type {String}
         */
        this.purpose = response.purpose;

        /**
         * The ID of the school that the homework is set for.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The logo URL of of the school that the homework is set for.
         * @type {String}
         */
        this.school_logo_url = response.school_logo_url;
        
        /**
         * The name of the school that the homework is set for.
         * @type {String}
         */
        this.school_name = response.school_name;

        /**
         * The subject of the homework.
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
         * The ID of the teacher who set the homework.
         * @type {Number}
         */
        this.teacher_id = response.teacher_id;

        /**
         * The name of the teacher who set the homework.
         * @type {String}
         */
        this.teacher_name = response.teacher_name;

        /**
         * The title of the homework.
         * @type {String}
         */
        this.title = response.title;

        /**
         * The timestamp of when the homework was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * An array of links to web resources for the homework.
         * @type {Array<String>}
         */
        this.web_links = response.web_links.map(web_link => new WebLink(web_link));
    }

    /**
     * Get attachments on the homework.
     * @param {Array<Number>} [ids] The IDs of the attachments to retrieve.
     * @returns {Promise<Array<Attachment>>}
     */
    getAttachments(ids) {
        return this._client.getAttachments(ids || this.attachment_ids);
    }

    /**
     * Get the teacher who set the homework.
     * @returns {Promise<Employee>}
     */
    getTeacher() {
        return this._client.getEmployee(this.teacher_id);
    }

    /**
     * Get the client user's submission to the homework.
     * @returns {Promise<HomeworkSubmission>}
     */
    getSubmission() {
        return this._client.getHomeworkSubmission(this.id + "-" + this._client.user.id);
    }

    /**
     * Get submissions to the homework.
     * @param {Array<Number>} [ids] The IDs of the homework submissions to retrieve.
     * @returns {Promise<Array<HomeworkSubmissions>>}
     */
    getSubmissions(ids) {
        return this._client.getHomeworkSubmissions(ids || this.submission_ids);
    }

    /**
     * Get comments made on homework submissions.
     * @param {Array<Number>} [ids] The IDs of the homework comments to retrieve.
     * @returns {Promise<Array<SubmissionComment>>}
     */
    getSubmissionComments(ids) {
        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/homework_submissions", {
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

module.exports = Homework;