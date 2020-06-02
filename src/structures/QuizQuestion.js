/**
 * Represents a question on a quiz on SMHW.
 */
class QuizQuestion {
    /**
     * Instantiate a QuizQuestion object.
     * @param {Client} client The client that is instantiating this object.
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
         * The correct answer to the question.
         * @type {String}
         */
        this.correct_answer = response.correct_answer;

        /**
         * The timestamp of when the question was created.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The description of the question.
         * @type {String}
         */
        this.description = response.description;

        /**
         * The ID of the question.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The file name of the question image.
         * @type {String}
         */
        this.image_file_name = response.image_file_name;

        /**
         * The URL of a large version of the question image.
         * @type {String}
         */
        this.image_large_url = response.image_large_url;

        /**
         * The URL of a small version of the question image.
         * @type {String}
         */
        this.image_small_url = response.image_small_url;

        /**
         * The URl of the question image.
         * @type {String}
         */
        this.image_url = response.image_url;

        /**
         * The URL of an extra small version of the question image.
         * @type {String}
         */
        this.image_xsmall_url = response.image_xsmall_url = response.image_xsmall_url;
        
        /**
         * An array of incorrect answers to the question.
         * @type {Array<String>}
         */
        this.incorrect_answers = response.incorrect_answers;

        /**
         * @type {Boolean}
         */
        this.is_preparing = response.is_preparing;

        /**
         * The different options for the question.
         * @type {Array<String>}
         */
        this.options = [this.correct_answer, ...this.incorrect_answers];

        /**
         * The timestamp of when the question was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();
    }
}

module.exports = QuizQuestion;