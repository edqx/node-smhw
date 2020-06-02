const request = require("./request.js");

const API_BASE_URL = "api.showmyhomework.co.uk";
const SATCHELONE = "https://www.satchelone.com"

const CLIENTID_WEB = "55283c8c45d97ffd88eb9f87e13f390675c75d22b4f2085f43b0d7355c1f";
const CLIENTSECRET_WEB = "c8f7d8fcd0746adc50278bc89ed6f004402acbbf4335d3cb12d6ac6497d3";

const Attachment = require("./structures/Attachment.js");
const ClassGroup = require("./structures/ClassGroup.js");
const ClientAuthentication = require("./structures/ClientAuthentication.js");
const ClientEvent = require("./structures/ClientEvent.js");
const Employee = require("./structures/Employee.js");
const FlexibleTask = require("./structures/FlexibleTask.js");
const FlexibleTaskSubmission = require("./structures/FlexibleTaskSubmission.js")
const Homework = require("./structures/Homework.js");
const HomeworkSubmission = require("./structures/HomeworkSubmission.js");
const Quiz = require("./structures/Quiz.js");
const QuizQuestion = require("./structures/QuizQuestion.js");
const QuizSubmission = require("./structures/QuizSubmission.js");
const QuizSubmissionComment = require("./structures/QuizSubmissionComment.js");
const QuizSubmissionQuestion = require("./structures/QuizSubmissionQuestion.js");
const School = require("./structures/School.js");
const SchoolIncomplete = require("./structures/Schoolincomplete.js");
const SchoolPrivateInformation = require("./structures/SchoolPrivateInformation.js");
const StandardSubject = require("./structures/StandardSubject.js");
const Student = require("./structures/Student.js");
const SubmissionMethod = require("./structures/SubmissionMethod.js");
const SubmissionComment = require("./structures/SubmissionComment.js");
const SubmissionEvent = require("./structures/SubmissionEvent.js");
const Task = require("./structures/Task.js");
const User = require("./structures/User.js");
const UserPrivateInformation = require("./structures/UserPrivateInformation.js");

/**
 * Represents access to SatchelOne's SMHW API.
 */
class SMHWClient {
    /**
     * Instantiate a SMHW Client.
     * @param {Object} options Options to instantiate the client with.
     */
    constructor (options = {}) {
        /**
         * Options for the client.
         * @type {Object}
         * @private
         */
        this._options = options;

        /**
         * Authentication information for the client.
         * @type {ClientAuthentication}
         * @private
         */
        this._auth = null;

        /**
         * The active client heartbeat.
         * @type {Number}
         * @private
         */
        this._heartbeat = null;

        /**
         * The timestamp of the last heartbeat.
         * @type {Number}
         * @private
         */
        this._last_heartbeat = null;
        
        /**
         * The student user of the client.
         * @type {Student}
         */
        this.student = null;
        
        /**
         * The school that the student user of the client belongs to.
         * @type {School}
         */
        this.school = null;
        
        /**
         * Private information of the client user.
         * @type {UserPrivateInformation}
         */
        this.user = null;
    }

    /**
     * Keep a client connection alive.
     * @returns {Promise}
     * @ignore
     */
    beat() {
        return new Promise((resolve, reject) => {
            this.make("GET", "api/heartbeat", {
                referer: "/calendar/personal"
            }).then(response => {
                this._last_heartbeat = response.time;

                resolve(response);
            }).catch(reject);
        });
    }
    
    /**
     * @typedef RequestOptions
     * @property {String} [host] The base hostname for the request.
     * @property {Number} [port] The port of the request.
     * @property {Object} [query] The querystring options for the request.
     * @property {Object} [body] The post data body of the request.
     * @property {Object} [headers] The headers for the request.
     * @property {String} [referer] The referer path for the request.
     * @property {Object} [payload] The JSON payload for the request.
     */

    /**
     * Make a normal request or an authorised one if authentication is available.
     * @param {String} method The method of request to use.
     * @param {String} path The path of the resource to make a request to.
     * @param {RequestOptions} options Options for the request.
     * @returns {Promise<Object>}
     * @private
     * @ignore
     */
    make(method, path, options = {}) {
        if (!options.headers) {
            options.headers = {};
        }

        if (this._auth) {
            options.headers.authorization = "Bearer " + this._auth.access_token;
        }

        return request.make(method, path, options);
    }

    /**
     * Log in to a SMHW account for an access token to make authorised requests to SMHW.
     * @param {Number|Object} school_id The ID of the school of the account to log in to.
     * @param {String} username The username of the account to log in to.
     * @param {String} password The password of the account to log in to. (Not stored)
     * @returns {Promise}
     */
    login(school_id, username, password) {
        if (typeof school_id === "object") {
            return new Promise((resolve, reject) => {
                this._auth = new ClientAuthentication(school_id);
    
                this.make("GET", "/api/students/" + this._auth.user_id, {
                    query: {
                        include: "user_private_info,school"
                    }
                }).then(response => {
                    this.student = new Student(this, response.student);
                    this.school = new School(this, response.schools[0]);
                    this.user = new UserPrivateInformation(this, response.user_private_infos[0]);

                    resolve(true);

                    if (this.options.keep_heartbeat) {
                        this._heartbeat = setInterval(_ => {
                            this.beat();
                        });
                    }
                }).catch(reject);
            });
        }

        return new Promise((resolve, reject) => {
            this.make("POST", "/oauth/token", {
                body: {
                    grant_type: "password",
                    username: username,
                    password: password,
                    school_id: school_id
                },
                query: {
                    client_id: CLIENTID_WEB,
                    client_secret: CLIENTSECRET_WEB
                },
                headers: {
                    "accept": "*/*"
                },
                referer: "/login"
            }).then(response => {
                if (response.errors) {
                    reject(response.errors);
                    return;
                }

                this._auth = new ClientAuthentication(response);

                this.make("GET", "/api/students/" + this._auth.user_id, {
                    query: {
                        include: "user_private_info,school"
                    }
                }).then(response => {
                    this.student = new Student(this, response.student);
                    this.school = new School(this, response.schools[0]);
                    this.user = new UserPrivateInformation(this, response.user_private_infos[0]);

                    resolve(true);

                    if (this.options.keep_heartbeat) {
                        this._heartbeat = setInterval(_ => {
                            this.beat();
                        });
                    }
                }).catch(reject);
            }).catch(reject);
        });
    }

    /**
     * Stop a continuous client connection.
     */
    stopHeartbeat() {
        if (this._heartbeat) {
            clearInterval(this._heartbeat);
        }
    }

    /**
     * Get submission methods on SMHW.
     * @param {Array<Number>} ids An array of submission method IDs to retrieve.
     * @returns {Promise<Array<SubmissionMethod>>}
     */
    getSubmissionMethods(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getSubmissionMethods([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/submission_methods").then(response => {
                if (response.sumbission_methods) {
                    if (ids) {
                        var sumbission_methods = response.submission_methods.filter(submission_method => ids.indexOf(submission_method.id) !== -1);

                        resolve(submission_methods.map(submission_method => new SubmissionMethod(this, submission_method)));
                    } else {
                        resolve(response.submission_methods.map(submission_method => new SubmissionMethod(this, submission_method)));
                    }
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get standard subjects on SMHW.
     * @param {Array<Number>} ids An array of standard subject IDs to retrieve.
     * @returns {Promise<Array<StandardSubject>>}
     */
    getStandardSubjects(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getStandardSubjects([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/standard_subjects").then(response => {
                if (response.standard_subjects) {
                    if (ids) {
                        var standard_subjects = response.standard_subjects.filter(standard_subject => ids.indexOf(standard_subject.id) !== -1);

                        resolve(standard_subjects.map(standard_subject => new StandardSubject(this, standard_subject)));
                    } else {
                        resolve(response.standard_subjects.map(standard_subject => new StandardSubject(this, standard_subject)));
                    }
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Search for schools by their name.
     * @param {String} term The term to search schools by.
     * @param {Number} [limit] The limit of schools to return.
     */
    searchSchools(term, limit = 20) {
		return new Promise((resolve, reject) => {
			this.make("GET", "/api/public/school_search", {
				query: {
					filter: term,
					limit: limit
				}
			}).then(response => {
				if (response.schools) {
                    resolve(response.schools.map(school => new SchoolIncomplete(this, school)));
                } else {
                    reject(response);
                }
            }).catch((err) => {
				reject(err);
			});
		});
	}

    /**
     * Get a school by its ID.
     * @param {Number} id The ID of the school to retrieve.
     * @returns {Promise<School>}
     */
    getSchool(id) {
        return new Promise((resolve, reject) => {
            this.make("GET", "/api/schools/" + id).then(response => {
                if (response.school) {
                    resolve(new School(this.client, response.school));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a school's private information.
     * @param {Number} id The ID of the school's private information to retrieve.
     * @returns {Promise<SchoolPrivateInformation>}
     */
    getSchoolPrivateInformation(id) {
        return new Promise((resolve, reject) => {
            this.make("GET", "/api/school_private_infos/" + id).then(response => {
                if (response.school_private_info) {
                    resolve(new SchoolPrivateInformation(this.client, response.school_private_info));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get client events fired for the client user.
     * @param {Object} options Event request options.
     * @param {Array<Number>} ids An array of event IDs to retrieve.
     * @returns {Promise<Array<ClientEvent>>}
     */
    getOwnEvents(options, ids) {
        if (!options) {
            return this.getOwnEvents({}, ids);
        }

        if (ids && !Array.isArray(ids)) {
            return this.getOwnEvents(options, [ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/events", {
                query: {
                    limit: options.limit || 21,
                    offset: options.offset || 0,
                    recipient_id: options.recipient_id || this.user.id,
                    visible: typeof options.visible === "undefined" ? true : options.visible
                }
            }).then(response => {
                if (response.events) {
                    if (ids) {
                        var events = response.events.filter(event => ids.indexOf(event.id) !== -1);

                        resolve(events.map(event => new ClientEvent(this, event)));
                    } else {
                        resolve(response.events.map(event => new ClientEvent(this, event)));
                    }
                } else {
                    reject(response);
                }
            })
        });
    }

    /**
     * Get client events.
     * @param {Array<Number>} ids An array of Event IDs to retrieve.
     * @returns {Promise<Array<ClientEvent>>}
     */
    getEvents(ids) {
        if (!ids) {
            return this.getOwnEvents();
        } else if (!Array.isArray(ids)) {
            return this.getEvents([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/events", {
                query: {
                    ids: ids
                }
            }).then(response => {
                if (response.events) {
                    if (ids) {
                        var events = response.events.filter(event => ids.indexOf(event.id) !== -1);

                        resolve(events.map(event => new ClientEvent(this, event)));
                    } else {
                        resolve(response.events.map(event => new ClientEvent(this, event)));
                    }
                } else {
                    reject(response);
                }
            })
        });
    }

    /**
     * Get a client event by its ID.
     * @param {Number} id The ID of the event to retrieve.
     * @returns {Promise<ClientEvent>}
     */
    getEvent(id) {
        return new Promise((resolve, reject) => {
            this.getEvents([id]).then(events => {
                resolve(events[0]);
            }).catch(reject);
        });
    }

    /**
     * Get submission events by their IDs.
     * @param {Array<Number>} ids An array of submission event IDs to retrieve.
     * @returns {Promise<Array<SubmissionEvents>>}
     */
    getSubmissionEvents(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getSubmissionEvents([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/submission_events", {
                query: {
                    ids: ids
                }
            }).then(response => {
                if (response.submission_events) {
                    resolve(response.submission_events.map(submission_event => new SubmissionEvent(this, submission_event)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a submission event by its ID.
     * @param {Number} id The ID of the submission event to retrieve.
     * @returns {Promise<SubmissionEvent>}
     */
    getSubmissionEvent(id) {
        return new Promise((resolve, reject) => {
            this.getSubmissionEvents([id]).then(submission_events => {
                resolve(submission_events[0]);
            }).catch(reject);
        });
    }

    /**
     * Get tasks set.
     * @param {Array<Number>} ids An array of task IDs to retrieve.
     * @returns {Promise<Array<Task>>}
     */
    getTasks(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getTasks([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/todos").then(response => {
                if (response.todos) {
                    if (ids) {
                        var todos = response.todos.filter(todo => ids.indexOf(todo.id) !== -1);

                        resolve(todos.map(todo => new Task(this, todo)));
                    } else {
                        resolve(response.todos.map(todo => new Task(this, todo)));
                    }
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a task by its ID.
     * @param {Number} id The ID of the task to retrieve.
     * @returns {Promise<Task>}
     */
    getTask(id) {
        return new Promise((resolve, reject) => {
            this.getTasks([id]).then(tasks => {
                resolve(tasks[0]);
            }).catch(reject);
        });
    }

    /**
     * Get students by their IDs.
     * @param {Array<Number>} ids An array of Student IDs to retrieve.
     * @returns {Promise<Array<Student>>}
     */
    getStudents(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getStudents([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/students", {
                query: {
                    ids: ids
                }
            }).then(response => {
                if (response.students) {
                    resolve(response.students.map(student => new Student(this, student)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a student by its ID.
     * @param {Number} id The ID of the student to retrieve.
     * @returns {Promise<Student>}
     */
    getStudent(id) {
        return new Promise((resolve, reject) => {
            this.getStudents([id]).then(students => {
                resolve(students[0]);
            }).catch(reject);
        });
    }

    /**
     * Get employees by their IDs.
     * @param {Array<Number>} ids An array of employee IDs to retrieve.
     * @returns {Promise<Array<Employee>>}
     */
    getEmployees(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getEmployees([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/employees", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.employees) {
                    resolve(response.employees.map(employee => new Employee(this, employee)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get an employee by its ID.
     * @param {Number} id The ID of the employee to retrieve.
     * @returns {Promise<Employee>}
     */
    getEmployee(id) {
        return new Promise((resolve, reject) => {
            this.getEmployees([id]).then(employees => {
                resolve(employees[0]);
            }).catch(reject);
        });
    }

    /**
     * Get users by their IDs.
     * @param {Array<Number>} ids An array of user IDs to retrieve.
     * @returns {Promise<Array<User>>}
     */
    getUsers(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getUsers([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/users", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.users) {
                    resolve(response.users.map(user => new User(this, user)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a user by its ID.
     * @param {Number} id The ID of the user to retrieve.
     * @returns {Promise<User>}
     */
    getUser(id) {
        return new Promise((resolve, reject) => {
            this.getUsers([id]).then(users => {
                resolve(users[0]);
            }).catch(reject);
        });
    }

    /**
     * Get class groups by their IDs.
     * @param {Array<Number>} ids An array of class group IDs to retrieve.
     * @returns {Promise<Array<ClassGroup>>}
     */
    getClassGroups(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getClassGroups([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/class_groups", {
                query: {
                    ids: ids 
                }
            }).then(response => {
                if (response.class_groups) {
                    resolve(response.class_groups.map(class_group => new ClassGroup(this, class_group)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a class group by its ID.
     * @param {Number} id The ID of the class group to retrieve.
     * @returns {Promise<ClassGroup>}
     */
    getClassGroup(id) {
        return new Promise((resolve, reject) => {
            this.getClassgroups([id]).then(class_groups => {
                resolve(class_groups[0]);
            }).catch(reject);
        });
    }

    /**
     * Get submission commenst by their IDs.
     * @param {Array<Number>} ids An array of submission comment IDs to retrieve.
     * @returns {Promise<Array<SubmissionComment>>}
     */
    getSubmissionComments(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getSubmissionComments([ids]);
        }

        return new Promise((resolve, reject) => {
            this._client.make("GET", "/api/submission_comments", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.submission_comments) {
                    resolve(response.submission_comments.map(submission_comment => new SubmissionComment(this, submission_comment)));
                } else {
                    reject(response);
                }
            });
        });
    }

    /**
     * Get a submission comment by its ID.
     * @param {Number} id The ID of the submission comment to retrieve.
     * @returns {Promise<SubmissionComment>}
     */
    getSubmissionComment(id) {
        return new Promise((resolve, reject) => {
            this.getSubmissionComments([id]).then(submission_comments => {
                resolve(submission_comments[0]);
            }).catch(reject);
        });
    }

    /**
     * Get attachments by their IDs.
     * @param {Array<Number>} ids An array of attachment IDs to retrieve.
     * @returns {Promise<Array<Attachment>>}
     */
    getAttachments(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getAttachments([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/attachments", {
                query: {
                    ids: ids 
                }
            }).then(response => {
                if (response.attachments) {
                    resolve(response.attachments.map(attachment => new Attachment(this, attachment)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get an attachment by its ID.
     * @param {Number} id The ID of the attachment to retrieve.
     * @returns {Promise<Attachment>}
     */
    getAttachment(id) {
        return new Promise((resolve, reject) => {
            this.getAttachments([id]).then(attachments => {
                resolve(attachments[0]);
            }).catch(reject);
        });
    }

    /**
     * Get homework assignments by their IDs.
     * @param {Array<Number>} ids An array of homework IDs to retrieve.
     * @returns {Promise<Array<Homework>>}
     */
    getHomeworks(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getHomeworks([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/homeworks", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.homeworks) {
                    resolve(response.homeworks.map(homework => new Homework(this, homework)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a homework assignment by its ID.
     * @param {Number} id The ID of the homework assignment to retrieve.
     * @returns {Promise<Homework>}
     */
    getHomework(id) {
        return new Promise((resolve, reject) => {
            this.getHomeworks([id]).then(homeworks => {
                resolve(homeworks[0]);
            }).catch(reject);
        });
    }

    /**
     * Get homework submissions by their IDs.
     * @param {Array<Number>}
     * @returns {Promise<Array<HomeworkSubmission>>}
     */
    getHomeworkSubmissions(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getHomeworkSubmissions([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/homework_submissions", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.homework_submissions) {
                    resolve(response.homework_submissions.map(homework_submission => new HomeworkSubmission(this, homework_submission)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a homework submission by its ID.
     * @param {Number} id The ID of the homework submission to retrieve.
     * @returns {Promise<HomeworkSubmission>}
     */
    getHomeworkSubmission(id) {
        return new Promise((resolve, reject) => {
            this.getHomeworkSubmissions([id]).then(homework_submissions => {
                resolve(homework_submissions[0]);
            }).catch(reject);
        });
    }

    /**
     * Get flexible task assignments by their IDs.
     * @param {Array<Number>} ids An array of flexible task IDs to retrieve.
     * @returns {Promise<Array<FlexibleTask>>}
     */
    getFlexibleTasks(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getFlexibleTasks([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/flexible_tasks", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.flexible_tasks) {
                    resolve(response.flexible_tasks.map(flexible_task => new FlexibleTask(this, flexible_task)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a flexible task assignment by its ID.
     * @param {Number} id The ID of the flexible task assignment to retrieve.
     * @returns {Promise<FlexibleTask>}
     */
    getFlexibleTask(id) {
        return new Promise((resolve, reject) => {
            this.getFlexibleTasks([id]).then(flexible_tasks => {
                resolve(flexible_tasks[0]);
            }).catch(reject);
        });
    }

    /**
     * Get homework submissions by their IDs.
     * @param {Array<Number>}
     * @returns {Promise<Array<FlexibleTaskSubmission>>}
     */
    getFlexibleTaskSubmissions(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getFlexibleTaskSubmissions([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/flexible_task_submissions", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.flexible_task_submissions) {
                    resolve(response.flexible_task_submissions.map(flexible_task_submission => new FlexibleTaskSubmission(this, flexible_task_submission)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a flexible task submission by its ID.
     * @param {Number} id The ID of the flexible task submission to retrieve.
     * @returns {Promise<FlexibleTaskSubmission>}
     */
    getFlexibleTaskSubmission(id) {
        return new Promise((resolve, reject) => {
            this.getFlexibleTaskSubmissions([id]).then(flexible_task_submissions => {
                resolve(flexible_task_submissions[0]);
            }).catch(reject);
        });
    }

    /**
     * Get quiz assignments by their IDs.
     * @param {Array<Number>} ids An array of quiz IDs to retrieve.
     * @returns {Promise<Array<Quiz>>}
     */
    getQuizzes(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getQuizzes([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/quizzes", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.quizzes) {
                    resolve(response.quizzes.map(quiz => new Quiz(this, quiz)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a quiz assignment by its ID.
     * @param {Number} id The ID of the quiz assignment to retrieve.
     * @returns {Promise<Quiz>}
     */
    getQuiz(id) {
        return new Promise((resolve, reject) => {
            this.getQuizzes([id]).then(quizzes => {
                resolve(quizzes[0]);
            }).catch(reject);
        });
    }

    /**
     * Get quiz questions by their IDs.
     * @param {Array<Number>} ids An array of quiz question IDs to retrieve.
     * @returns {Promise<Array<QuizQuestion>>}
     */
    getQuizQuestions(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getQuizQuestions([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/quiz_questions", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.quiz_questions) {
                    resolve(response.quiz_questions.map(quiz_question => new QuizQuestion(this, quiz_question)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }
    
    /**
     * Get a quiz question by its ID.
     * @param {Number} id The ID of the quiz question to retrieve.
     * @returns {Promise<QuizQuestion>}
     */
    getQuizQuestion(id) {
        return new Promise((resolve, reject) => {
            this.getQuizQuestions([id]).then(quiz_questions => {
                resolve(quiz_questions[0]);
            }).catch(reject);
        });
    }

    /**
     * Get an array of quiz submissions by their IDs.
     * @param {Array<Number>} ids An array of quiz submission IDs to retrieve.
     * @returns {Promise<Array<QuizSubmission>>}
     */
    getQuizSubmissions(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getQuizSubmissions([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/quiz_submissions", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.quiz_submissions) {
                    resolve(response.quiz_submissions.map(quiz_submission => new QuizSubmission(this, quiz_submission)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a quiz submission by its ID.
     * @param {Number} id The ID of the quiz submission to retrieve.
     * @returns {Promise<QuizSubmission>}
     */
    getQuizSubmission(id) {
        return new Promise((resolve, reject) => {
            this.getQuizSubmissions([id]).then(quiz_submissions => {
                resolve(quiz_submissions[0]);
            }).catch(reject);
        });
    }

    /**
     * Get an array of quiz submission questions by their IDs.
     * @param {Array<Number>} ids An array of quiz submission question IDs to retrieve.
     * @returns {Promise<Array<QuizSubmissionQuestion>>}
     */
    getQuizSubmissionQuestions(ids) {
        if (ids && !Array.isArray(ids)) {
            return this.getQuizSubmissionQuestions([ids]);
        }

        return new Promise((resolve, reject) => {
            this.make("GET", "/api/quiz_submission_questions", {
                query: {
                    ids
                }
            }).then(response => {
                if (response.quiz_submission_questions) {
                    resolve(response.quiz_submission_questions.map(quiz_submission_question => new QuizSubmissionQuestion(this, quiz_submission_question)));
                } else {
                    reject(response);
                }
            }).catch(reject);
        });
    }

    /**
     * Get a quiz submission question by its ID.
     * @param {Number} id The ID of the quiz submission question to retrieve.
     * @returns {Promise<QuizSubmissionQuestion>}
     */
    getQuizSubmissionQuestion(id) {
        return new Promise((resolve, reject) => {
            this.getQuizSubmissionQuestion([id]).then(quiz_submission_questions => {
                resolve(quiz_submission_questions[0]);
            }).catch(reject);
        });
    }
}

module.exports = SMHWClient;