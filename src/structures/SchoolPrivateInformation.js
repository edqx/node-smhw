/**
 * Represents private information for a school on SMHW.
 */
class SchoolPrivateInformation {
    /**
     * Instantiate a SchoolPrivateInformation object.
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
         * Whether or not the school has announcements enabled.
         * @type {Boolean}
         */
        this.announcements_enabled = response.announcements_enabled;

        /**
         * An array of IDs for school badges.
         * @type {Array<Number>}
         */
        this.badge_ids = response.badge_ids;

        /**
         * The current academic year ID for the school.
         * @type {Number}
         */
        this.current_academic_year_id = response.current_academic_year_id;

        /**
         * The timestamp of when the school['s trial] expires.
         * @type {Number}
         */
        this.expires_on = new Date(response.expires_on).getTime();

        /**
         * Whether certain features are enabled or disabled for the school.
         * @type {Object}
         */
        this.features = {
            /**
             * Whether or not the school has the assessment app feature enabled.
             * @type {Boolean}
             */
            assessment_app_enabled: response.features.assessment_app_enabled,

            /**
             * Whether or not the school has the assessments for teachers feature enabled.
             * @type {Boolean}
             */
            assessment_enabled_for_teachers: response.features.assessment_enabled_for_teachers,

            /**
             * Whether or not the school has the detentions app feature enabled.
             * @type {Boolean}
             */
            detentions_enabled: response.features.detentions_enabled,

            /**
             * @type {Boolean}
             */
            sso_enabled_for_employees: response.features.sso_enabled_for_employees,

            /**
             * @type {Boolean}
             */
            sso_enabled_for_students: response.features.sso_enabled_for_students,

            /**
             * @type {Boolean}
             */
            timetable_promo_disabled: response.features.timetable_promo_disabled,

            /**
             * @type {Boolean}
             */
            xod_enabled: response.features.xod_enabled,

            /**
             * @type {Boolean}
             */
            xod_scope_enabled_photos: response.features.xod_scope_enabled_photos,

            /**
             * @type {Boolean}
             */
            xod_scope_enabled_students: response.features.xod_scope_enabled_students
        };

        /**
         * Whether or not the school has shared files in home page zones.
         * @type {Boolean}
         */
        this.has_shared_files_in_zones = response.has_shared_files_in_zones;

        /**
         * The ID of the school.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The ID of the school's kudos settings.
         * @type {Number}
         */
        this.kudos_settings_id = response.kudos_settings_id;

        /**
         * Links to school API resources.
         * @type {Object}
         */
        this.links = {
            /**
             * A link to marking schemes that the school uses.
             * @type {String}
             */
            marking_schemes: response.links.marking_schemes
        };

        /**
         * Whether or not the school has live chat enabled.
         * @type {Boolean}
         */
        this.livechat_enabled = response.livechat_enabled;

        /**
         * The locale code of the school.
         * @type {String}
         */
        this.locale = response.locale;

        /**
         * Whether or not the school has online classes enabled.
         * @type {Boolean}
         */
        this.online_classes_enabled = response.online_classes_enabled;

        /**
         * Whether or not the school has student signup enabled.
         * @type {Boolean}
         */
        this.student_signup_enabled = response.student_signup_enabled;

        /**
         * Whether or not the school has teacher signup enabled.
         * @type {Boolean}
         */
        this.teacher_signup_enabled = response.teacher_signup_enabled;

        /**
         * The total amount of storage used by the school.
         * @type {Number}
         */
        this.total_storage_used = response.total_storage_used;

        /**
         * Whether or not the school is using a trial of SMHW.
         * @type {Boolean}
         */
        this.trial = response.trial;
    }
}

module.exports = SchoolPrivateInformation;