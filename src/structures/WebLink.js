/**
 * Represents a web link on SMHW.
 */
class WebLink {
    /**
     * Instantiate a WebLink object.
     * @param {Object} response The data for the object.
     */
    constructor(response) {
        /**
         * The timestamp of when the web link was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The ID of the web link.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The URL of the thumbnail for the web link.
         * @type {String}
         */
        this.thumb_url = response.thumb_url;

        /**
         * The title of the web link.
         * @type {String}
         */
        this.title = response.title;

        /**
         * The timestamp of when the web link was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The URL of the web link.
         * @type {String}
         */
        this.url = response.url;
    }
}

module.exports = WebLink;