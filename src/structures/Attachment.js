const User = require("./User.js");

/**
 * Represents a file attachment on SMHW.
 */
class Attachment {
    /**
     * Instantiate an attachment object.
     * @param {Client} client The client that is instantiating the object.
     * @param {object} response The data for the object.
     */
    constructor(client, response) {
        /**
         * The client that instantiated this object.
         * @type {Client}
         * @private
         */
        this._client = client;

        /**
         * The type of attachment file content.
         * @type {String}
         */
        this.content_type = response.content_type;

        /**
         * The timestamp of when the attachment was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The file size of the attachment in bytes.
         * @type {Number}
         */
        this.file_size = response.file_size;

        /**
         * The URL of the attachment file.
         * @type {String}
         */
        this.file_url = response.file_url;

        /**
         * The filename of the attachment file.
         * @type {String}
         */
        this.filename = response.filename;

        /**
         * Whether or not the attachment is for logged in users only.
         * @type {Boolean}
         */
        this.for_logged_in_only = response.for_logged_in_only;

        /**
         * The ID of the attachment.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * Whether or not the attachment is previewable.
         * @type {Boolean} 
         */
        this.is_previewable = response.is_previewable;

        /**
         * The preview URL of the attachment.
         * @type {String}
         */
        this.preview_url = response.preview_url;

        /**
         * The provider of the file if it is hosted on a third party.
         * @type {String}
         */
        this.third_party_provider = response.third_party_provider;

        /**
         * @type {String}
         */
        this.third_party_shared_link = response.third_party_shared_link;

        /**
         * The timestamp of when the attachment was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();
        
        /**
         * The ID of the user who created the attachment.
         * @type {Number}
         */
        this.user_id = response.user_id;
    }

    /**
     * Get the user who created the attachment.
     * @returns {Promise<User>}
     */
    getUser() {
        return this._client.getUser(this.user_id);
    }
}

module.exports = Attachment;