/**
 * Represents a Task on SMHW.
 */
class Task {
    /**
     * Instantiate a Task object.
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
         * The name of the class group that the task is set for.
         * @type {String}
         */
        this.class_group_name = response.class_group_name;

        /**
         * The description of the task.
         * @type {String}
         */
        this.class_task_description = response.class_task_description;

        /**
         * The ID of the task.
         * @type {Number}
         */
        this.class_task_id = response.class_task_id;

        /**
         * The title of the task.
         * @type {String}
         */
        this.class_task_title = response.class_task_title;

        /**
         * The type of task.
         * @type {String}
         */
        this.class_task_type = response.class_task_type;

        /**
         * Whether or not the task has been completed.
         * @type {Boolean}
         */
        this.completed = response.completed;

        /**
         * The description of the task.
         * @type {String}
         */
        this.description = response.class_task_description;

        /**
         * The timestamp of when the task is due.
         * @type {Number}
         */
        this.due_on = new Date(response.due_on).getTime();

        /**
         * Whether or not the task has assignments.
         * @type {Boolean}
         */
        this.has_assignments = response.has_assignments;

        /**
         * The ID of the task.
         * @type {Number}
         */
        this.id = response.id;

        /**
         * The timestamp of when the task was issued.
         * @type {Number}
         */
        this.issued_on = new Date(response.issued_on).getTime();

        /**
         * The subject that the task was set for.
         * @type {String}
         */
        this.subject = response.subject;

        /**
         * The submission status of the task for client.
         * @type {String}
         */
        this.submission_status = response.submission_status;

        /**
         * The submission type of the task.
         * @type {string}
         */
        this.submission_status = response.submission_status;

        /**
         * The name of the teacher who set the task.
         * @type {String}
         */
        this.teacher_name = response.teacher_name;

        /**
         * The ID of the user who the task is for.
         * @type {String}
         */
        this.user_id = response.user_id;
    }

    /**
     * Mark the task as completed or incomplete.
     * @param {Boolean} completed Whether or not the task should be marked completed or incomplete.
     * @returns {Promise<Task>}
     */
    setCompleted(completed) {
        return new Promise((resolve, reject) => {
            this._client.make("PUT", "/api/todos/" + this.id, {
                payload: {
                    todo: {
						class_group_name: this.class_group_name,
						class_task_description: this.class_task_description,
						class_task_id: this.class_task_id,
						class_task_title: this.class_task_title,
						class_task_type: this.class_task_type,
						completed: completed,
						due_on: new Date(this.due_on).toISOString(),
						issued_on: new Date(this.issued_on).toISOString(),
						subject: this.subject,
						submission_status: this.submission_status,
						teacher_name: this.teacher_name
					}
                }
            }).then(task => {
                this.completed = completed;

                resolve(this);
            }).catch(reject);
        });
    }

    /**
     * Toggle the task as completed or incomplete.
     * @returns {Promise<Task>}
     */
    toggleCompleted() {
        return this.setCompleted(!this.completed);
    }

    /**
     * Get the task assignment.
     * @returns {Promise<Homework|FlexibleTask>}
     */
    getAssignment() {
        if (this.class_task_type === "Homework") {
            return this._client.getHomework(this.class_task_id);
        } else if (this.class_task_type === "FlexibleTask") {
            return this._client.getFlexibleTask(this.class_task_id);
        } else if (this.class_task_type === "Quiz") {
            return this._client.getQuiz(this.class_task_id);
        }
    }

    /**
     * Fire an event to set the homework as viewed.
     * @returns {Promise<Boolean>}
     */
    setViewed() {
        return new Promise((resolve, reject) => {
            this._client.make("POST", "/api/events", {
                payload: {
                    event: {
                        created_at: null,
                        event_type: this.setViewed,
                        eventable_id: this.class_task_id,
                        eventable_type: this.class_task_type,
                        read: false,
                        recipient_id: null,
                        user_id: null,
                        user_name: null
                    }
                }
            }).then(response => {
                if (response) {
                    resolve(response);
                } else {
                    reject(response);
                }
            }).catch(resolve);
        });
    }
}

module.exports = Task;