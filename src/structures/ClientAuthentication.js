/**
 * Represents an authentication on SMHW.
 */
class ClientAuthentication {
    /**
     * Instantiate a ClientAuthentication object.
     * @param {Object} response The data for the object.
     */
    constructor(response) {
        /**
         * The access token to make authorised requests.
         * @type {String}
         */
        this.access_token = response.access_token;

        /**
         * The timestamp when the authorisation was granted.
         * @type {Number}
         */
        this.created_at = response.created_at;

        /**
         * When the token expires. (in miliseconds)
         * @type {Number}
         */
        this.expires_in = response.expires_in;

        /**
         * The refresh token to refresh the access token.
         * @type {String}
         */
        this.refresh_token = response.refresh_token;

        /**
         * The ID of the school which the authenticated user belongs in.
         * @type {Number}
         */
        this.school_id = response.school_id;

        /**
         * The access token to make authorised requests.
         * @type {String}
         */
        this.smhw_token = response.smhw_token;

        /**
         * The type of token granted.
         * @type {String}
         */
        this.token_type = response.token_type;

        /**
         * The ID of the user which the authentication grants access to.
         * @type {Number}
         */
        this.user_id = response.user_id;

        /**
         * The type of user which the authentication grants access to.
         * @type {String}
         */
        this.user_type = response.user_type;
    }
}

module.exports = ClientAuthentication;