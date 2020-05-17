/**
 * Represents a user on SMHW.
 */
class User {
    /**
     * Instantiate a User object.
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
         * Whether or not the user is anonymous.
         * @type {Boolean}
         */
        this.anonymous = response.anonymous;

        /**
         * The Avatar URL of the user.
         * @type {String}
         */
        this.avatar = response.avatar;

        /**
         * The large avatar URL of the user.
         * @type {String}
         */
        this.avatar_large_thumb = response.avatar_large_thumb;

        /**
         * The small avatar URL of the user.
         * @type {String}
         */
        this.avatar_small_thumb = response.avatar_small_thumb;

        /**
         * The type of user that the user is on the back-end.
         * @type {String}
         */
        this.backend_type = response.backend_type;

        /**
         * The bio of the user.
         * @type {String}
         */
        this.bio = response.bio;

        /**
         * The timestamp when the user was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * Whether or not the user is disabled.
         * @type {Boolean}
         */
        this.disabled = response.disabled;

        /**
         * The facebook account of the user.
         * @type {String}
         */
        this.facebook = response.facebook;

        /**
         * The forename of the user.
         * @type {String}
         */
        this.forename = response.forename;

        /**
         * The ID of the user.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The timestamp of when the user left.
         * @type {Number}
         */
        this.left_at = new Date(response.left_at).getTime();

        /**
         * The LinkedIn account of the user.
         * @type {String}
         */
        this.linked_in = response.linked_in;

        /**
         * Whether or not the user is a mobile beta user.
         * @type {Boolean}
         */
        this.mobile_beta_user = response.mobile_beta_user;

        /**
         * The Pintrest account of the user.
         * @type {String}
         */
        this.pintrest = response.pintrest;

        /**
         * Whether or not the user has push notifications enabled.
         * @type {Boolean}
         */
        this.push_notifications_enabled = response.push_notifications_enabled;

        /**
         * The ID of the school that the user belongs to.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The ID of the user on SIMS.
         * @type {String}
         */
        this.sims_id = response.sims_id;

        /**
         * @type {Boolean}
         */
        this.student_friday_summary = response.student_friday_summary;

        /**
         * @type {Boolean}
         */
        this.student_marked_homework = response.student_marked_homework;
        
        /**
         * @type {Boolean}
         */
        this.student_overdue_summary = response.student_overdue_summary;

        /**
         * The surname of the user.
         * @type {String}
         */
        this.surname = response.surname;

        /**
         * @type {Boolean}
         */
        this.teacher_stats = response.teacher_stats;

        /**
         * @type {Boolean}
         */
        this.teacher_summary = response.teacher_summary;

        /**
         * The title of the user.
         * @type {String}
         */
        this.title = response.title;

        /**
         * The twitter account of the user.
         * @type {String}
         */
        this.twitter = response.twitter;

        /**
         * The timestamp of when the user was updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The ID of the user's private information.
         * @type {Number}
         */
        this.user_identity_id = response.user_identity_id;
        
        /**
         * The ID of the user's private information.
         * @type {Number}
         */
        this.user_private_info_id = response.user_private_info_id;
    }
}

module.exports = User;