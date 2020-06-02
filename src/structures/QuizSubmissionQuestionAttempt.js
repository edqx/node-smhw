/**
 * Represents a attempt to a submission question on a quiz on SMHW.
 */
class QuizSubmissionQuestionAttempt {
    /**
     * Instantiate a QuizSubmissionQuestionAttempt object.
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
         * The answer given for the attempt.
         * @type {String}
         */
        this.answer = response.answer;

        /**
         * Whether or not the attempt was correct.
         * @type {String}
         */
        this.correct = response.correct;

        /**
         * The timestamp of when the attempt was started.
         */
        this.start = new Date(response.start).getTime();
    }
}

module.exports = QuizSubmissionQuestionAttempt;