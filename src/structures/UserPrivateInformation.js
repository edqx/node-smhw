/**
 * Represents private information for a user on SMHW.
 */
class UserPrivateInformation {
    /**
     * Instantiate a UserPrivateInformation object
     * @param {Client} client The client that is instantiating the object.
     * @param {Object} response The data for the object.
     */
    
    constructor(client, response) {
        /**
         * The client that instantiated the object.
         * @type {Client}
         * @private
         */
        this._client = response.client;

        /**
         * The bio of the user.
         * @type {String}
         */
        this.bio = response.bio;

        /**
         * The calendar token for the user.
         * @type {String}
         */
        this.calendar_token = response.calendar_token;

        /**
         * The timestamp of when the user was confirmed.
         * @type {Number}
         */
        this.confirmed_at = new Date(response.confirmed_at).getTime();

        /**
         * @type {Boolean}
         */
        this.confirmed_publication_warning = response.confirmed_publication_warning;

        /**
         * The email of the user.
         * @type {String}
         */
        this.email = response.email;

        /**
         * Whether or not the user has filled in details or not.
         * @type {Boolean}
         */
        this.has_filled_details = response.has_filled_details;

        /**
         * The ID of the user.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * @type {Boolean}
         */
        this.intercom_enabled = response.intercom_enabled;

        /**
         * The timestamp of the last activity of the user.
         * @type {Number}
         */
        this.last_activity_at = new Date(response.last_activity_at).getTime();

        /**
         * @type {String}
         */
        this.last_subject = response.last_subject;

        /**
         * The timestamp of the last activity of the user.
         * @type {number}
         */
        this.last_user_activity_at = new Date(response.last_user_activity_at).getTime();

        /**
         * The ID of the user's mobile device.
         * @type {Number}
         */
        this.mobile_device_id = response.mobile_device_id;

        /**
         * The ID of the user's notification preferences.
         * @type {Number}
         */
        this.notification_preference_id = response.notification_preference_id;

        /**
         * The ID of the user's root folder.
         * @type {Number}
         */
        this.root_folder_id = response.root_folder_id;

        /**
         * The total storage that the user used.
         * @type {Number}
         */
        this.total_storage_used = response.total_storage_used;

        /**
         * The UID of the user.
         * @type {String}
         */
        this.uid = response.uid;

        /**
         * The username of the user.
         * @type {String}
         */
        this.username = response.username;
    }
}

module.exports = UserPrivateInformation;