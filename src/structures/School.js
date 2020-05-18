const SchoolPrivateInformation = require("./SchoolPrivateInformation.js");

const ClassGroup = require("./ClassGroup.js");
const ClassYear = require("./ClassYear.js");
// const DetentionTemplate = require("./DetentionTemplate.js");
const Employee = require("./Employee.js");

/**
 * Represents a school on SMHW.
 */
class School {
    /**
     * Instantiate a School object.
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
         * @type {Boolean}
         */
        this.active_directory_enabled = response.active_directory_enabled;

        /**
         * The address of the school.
         * @type {String}
         */
        this.address = response.address;

        /**
         * An array of announcement categories that the school belongs to.
         * @type {Array<Number>}
         */
        this.announcement_category_ids = response.announcement_category_ids;

        /**
         * Whether or not the school is subscribed to SatchelOne's assessment product.
         * @type {Boolean}
         */
        this.assessment = response.assessment;

        /**
         * Whether or not the school is subscribed to SatchelOne's attendance product.
         * @type {Boolean}
         */
        this.attendance = response.attendance;

        /**
         * The ID for the school's settings on SatchelOne's attendance.
         * @type {Number}
         */
        this.attendance_settings_id = response.attendance_settings_id;

        /**
         * The name of the school's banner.
         * @type {String}
         */
        this.banner_name = response.banner_name;

        /**
         * The URL of the school's banner.
         * @type {String}
         */
        this.banner_url = response.banner_url;

        /**
         * Whether or not the school has a book store.
         * @type {Boolean}
         */
        this.book_store = response.book_store;

        /**
         * The brand colour of the school.
         * @type {String}
         */
        this.brand_color = response.brand_color;

        /**
         * The brand colour of the school.
         * @type {String}
         */
        this.brand_colour = response.brand_color;

        /**
         * Whether or not the school has certain collins settings enabled.
         * @type {Object}
         */
        this.collins_settings = response.collins_settings;

        /**
         * @type {Boolean}
         */
        this.core = response.core;

        /**
         * The country of the school.
         * @type {String}
         */
        this.country = response.country;

        /**
         * The timestamp of when the school signed up to SMHW.
         * @type {Number}
         */
        this.created_at = new Date(response.created_at).getTime();

        /**
         * The description of the school.
         * @type {String}
         */
        this.description = response.description;

        /**
         * Whether or not the school is subscribed to SatchelOne's detentions product.
         * @type {Boolean}
         */
        this.detentions = response.detentions;

        /**
         * Whether or not the school has dropbox uploads disabled.
         * @type {Boolean}
         */
        this.dropbox_uploads_disabled = response.dropbox_uploads_disabled;

        /**
         * The email of the school.
         * @type {String}
         */
        this.email = response.email;

        /**
         * The facebook account of the school.
         * @type {String}
         */
        this.facebook = response.facebook;

        /**
         * Whether or not the school has Google Drive Uploads disabled.
         * @type {Boolean}
         */
        this.google_drive_uploads_disabled = response.google_drive_uploads_disabled;

        /**
         * @type {Boolean}
         */
        this.google_enabled = response.google_enabled;

        /**
         * Whether or not the school uses google's text-to-speech.
         * @type {Boolean}
         */
        this.google_tts = response.google_tts;

        /**
         * Whether or not the school has Office 365 integration.
         * @type {Boolean}
         */
        this.has_o365_integration = response.has_o365_integration;

        /**
         * Whether or not the school's home page is active.
         * @type {Boolean}
         */

        this.homepage_active = response.homepage_active;

        /**
         * The background for the school's home page.
         * @type {string}
         */
        this.homepage_background = response.homepage_background;

        /**
         * Whether or not the school has zones it's home page.
         * @type {Boolean}
         */
        this.homepage_zones = response.homepage_zones;

        /**
         * The ID of the school.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * @type {String}
         */
        this.import_external_type = response.import_external_type;

        /**
         * The instagram account of the school.
         * @type {String}
         */
        this.instagram = response.instagram;

        /**
         * Whether or not the school is active.
         * @type {Boolean}
         */
        this.is_active = response.is_active;

        /**
         * Whether or not the school has discussion enabled.
         * @type {Booolean}
         */
        this.is_discussion_enabled = response.is_discussion_enabled;

        /**
         * Whether or not the school has kudos enabled.
         * @type {Boolean}
         */
        this.kudos = response.kudos;

        /**
         * @type {Boolean}
         */
        this.kudos_import = response.kudos_import;

        /**
         * @type {Boolean}
         */
        this.kudos_writeback = response.kudos_writeback;

        /**
         * The latitude location of the school.
         * @type {Number}
         */
        this.latitude = response.latitude;

        /**
         * Links for API resources for the school.
         * @type {Object}
         */
        this.links = {
            /**
             * A link to the school's class groups.
             * @type {String}
             */
            class_groups: response.links.class_groups,
            
            /**
             * A link to the school's class years.
             * @type {String}
             */
            class_years: response.links.class_years,
            
            /**
             * A link to the school's detention templates.
             * @type {String}
             */
            detention_templates: response.links.detention_templates,
            
            /**
             * A link to the school's employees.
             * @type {String}
             */
            employees: response.links.employees,
            
            /**
             * A link to the school's house_groups.
             * @type {String}
             */
            house_groups: response.links.house_groups,
            
            /**
             * A link to the school's kudos reasons. (?).
             * @type {String}
             */
            kudos_reasons: response.links.kudos_reasons,
            
            /**
             * A link to the school's student's parents.
             * @type {String}
             */
            parents: response.links.parents,
            
            /**
             * A link to the school's kudos information. (?).
             * @type {String}
             */
            school_kudos_info: response.links.school_kudos_info,
            
            /**
             * A link to the school's students.
             * @type {String}
             */
            students: response.links.students,
            
            /**
             * A link to the school's subjects.
             * @type {String}
             */
            subjects: response.links.subjects
        };

        /**
         * The name of the school's logo.
         * @type {String}
         */
        this.logo_name = response.logo_name;

        /**
         * The URL of the school's logo.
         * @type {String}
         */
        this.logo_url = response.logo_url;

        /**
         * The longitude location of the school.
         * @type {Number}
         */
        this.longitude = response.longitude;

        /**
         * The name of the school.
         * @type {String}
         */
        this.name = response.name;

        /**
         * @type {Boolean}
         */
        this.native_apps_task_advert = response.native_apps_task_advert;

        /**
         * @type {Boolean}
         */
        this.new_classwork_enabled = response.new_classwork_enabled;

        /**
         * @type {Boolean}
         */
        this.new_students_list_enabled = response.new_students_list_enabled;

        /**
         * Whether or not the school has Only Drive uploads disabled.
         * @type {Boolean}
         */
        this.one_drive_uploads_disabled = response.one_drive_uploads_disabled;

        /**
         * @type {Boolean}
         */
        this.only_positive_kudos_enabled = response.only_positive_kudos_enabled;

        /**
         * The ID of the school's parent zone.
         * @type {Number}
         */
        this.parent_zone_root_id = response.parent_zone_root_id;

        /**
         * The phone number of the school.
         * @type {String}
         */
        this.phone_number = response.phone_number;

        /**
         * The post code of the school.
         * @type {String}
         */
        this.post_code = response.post_code;

        /**
         * @type {Boolean}
         */
        this.praise_points = response.praise_points;

        /**
         * Whether or not the school has certain premium features.
         * @type {Object}
         */
        this.premium_features = {
            /**
             * Whether or not the school has a custom theme.
             * @type {Boolean}
             */
            custom_theme_enabled: response.premium_features.custom_theme_enabled,

            /**
             * Whether or not the school has an extended notice board.
             * @type {Boolean}
             */
            extended_notice_board: response.extended_notice_board,

            /**
             * Whether or not the school has welfare notes.
             * @type {Boolean}
             */
            welfare_notes: response.welfare_notes,

            /**
             * @type {Boolean}
             */
            white_label_enabled: response.white_label_enabled
        };

        /**
         * The name of the school's prospectus.
         * @type {String}
         */
        this.prospectus_name = response.prospectus_name;

        /**
         * The URL of the school's prospectus.
         * @type {String}
         */
        this.prospectus_url = response.prospectus_url;

        /**
         * An array of IDs of registration groups in the school.
         * @type {Array<Number>}
         */
        this.registration_group_ids = response.registration_group_ids;

        /**
         * @type {Number}
         */
        this.root_directory_id = response.root_directory_id;

        /**
         * @type {Number}
         */
        this.school_praise_info_id = response.school_praise_info_id;

        /**
         * The ID of the school's private information.
         * @type {Number}
         */
        this.school_private_info_id = response.school_private_info_id;

        /**
         * The type of school.
         * @type {String}
         */
        this.school_type = response.school_type;

        /**
         * The ID for the school's root zone.
         * @type {Number}
         */
        this.school_zone_root_id = response.school_zone_root_id;

        /**
         * @type {Boolean}
         */
        this.serious_incidents_enabled = response.serious_incidents_enabled;

        /**
         * @type {Boolean}
         */
        this.share_kudos_comments_enabled = response.share_kudos_comments_enabled;

        /**
         * @type {Boolean}
         */
        this.show_staff_codes_for_public = response.show_staff_codes_for_public;

        /**
         * Whether or not the school has sims enabled/
         * @type {Boolean}
         */
        this.sims_enabled = response.sims_enabled;

        /**
         * Whether or not the school is subscribed to SatchelOne's smart seating product.
         * @type {Boolean}
         */
        this.smart_seating = response.smart_seating;

        /**
         * The ID for the school's student zone.
         * @type {Number}
         */
        this.student_zone_root_id = response.student_zone_root_id;

        /**
         * The subdomain of the school.
         * @type {String}
         */
        this.subdomain = response.subdomain;

        /**
         * Whether or not the school has teacher signup enabled.
         * @type {Boolean}
         */
        this.teacher_signup_enabled = response.teacher_signup_enabled;

        /**
         * The city of timezone of the school.
         * @type {String}
         */
        this.time_zone = response.time_zone;

        /**
         * Whether or not the school is subscribed to SatchelOne's timetables product.
         * @type {Boolean}
         */
        this.timetables = response.timetables;

        /**
         * The town of the school.
         * @type {String}
         */
        this.town = response.town;

        /**
         * Whether or not the school is using a trial of SMHW.
         * @type {Boolean}
         */
        this.trial = response.trial;

        /**
         * The twitter account of the school.
         * @type {String}
         * 
         */
        this.twitter = response.twitter;

        /**
         * The timestamp of when the school was last updated.
         * @type {Number}
         */
        this.updated_at = new Date(response.updated_at).getTime();

        /**
         * The website of the school.
         * @type {String}
         */
        this.website = response.website;

        /**
         * @type {Boolean}
         */
        this.xod_ready = response.xod_ready;
    }

    /**
     * Get private information about the school.
     * @returns {Promise<SchoolPrivateInformation>}
     */
    getPrivateInformation() {
        return this._client.getSchoolPrivateInformation(this.school_private_info_id);
    }

    /**
     * Get class groups in the school.
     * @param {Array<Number>} [ids] An array of class group IDs to retrieve.
     * @returns {Promise<Array<ClassGroup>>}
     */
    getClassGroups(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getClassGroups([ids]);
        }

        return new Promise((resolve, reject) => {
            this._client.make("GET", this.links.class_groups).then(response => {
                if (response.class_groups) {
                    if (ids) {
                        var class_groups = response.class_groups.filter(class_group => ids.indexOf(class_group) !== -1);

                        resolve(class_groups.map(class_group => new ClassGroup(this._client, class_group)));
                    } else {
                        resolve(response.class_groups.map(class_group => new ClassGroup(this._client, class_group)));
                    }
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get class years in the school.
     * @param {Array<Number>} [ids] An array of class year IDs to retrieve.
     * @returns {Promise<Array<ClassYear>>}
     */
    getClassYears(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getClassYears([ids]);
        }

        return new Promise((resolve, reject) => {
            this._client.make("GET", this.links.class_years).then(response => {
                if (response.class_years) {
                    if (ids) {
                        var class_years = response.class_years.filter(class_year => ids.indexOf(class_year.id) !== -1);

                        resolve(class_years.map(class_year => new ClassYear(this._client, class_year)));
                    } else {
                        resolve(response.class_years.map(class_year => new ClassYear(this._client, class_year)));
                    }
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get detention templates in the school.
     * @param {Array<Number>} [ids] An array of detention template IDs to retrieve.
     * @returns {Promise<Array<DetentionTemplate>>}
     */
    getDetentionTemplates(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getDetentionTemplates([ids]);
        }

        return new Promise((resolve, reject) => {
            this._client.make("GET", this.links.detetion_templates).then(response => {
                // TODO: Detention template class.
                // TODO: Complete this method.
            }).catch(reject);
        });
    }

    /**
     * Get employees in the school.
     * @param {Array<Number>} [ids] An array of employee IDs to retrieve.
     * @returns {Promise<Array<Employee>>}
     */
    getEmployees(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getEmployees([ids]);
        }

        return new Promise((resolve, reject) => {
            this._client.make("GET", this.links.employees).then(response => {
                if (response.employees) {
                    if (ids) {
                        var employees = response.employees.filter(employee => ids.indexOf(employee.id) !== -1);

                        resolve(employees.map(employee => new Employee(this._client, employee)));
                    } else {
                        resolve(response.employees.map(employee => new Employee(this._client, employee)));
                    }
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
}

module.exports = School;