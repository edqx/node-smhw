# node-shmw
[npm repository](https://npmjs.com/package/node-smhw)

[documentation](https://smhw.thechimp.store)

This project was made for my SMHW client, [Ryujin](https://github.com/edqx/Ryujin-SMHW)

## Examples
### Getting all tasks for tomorrow

```js
const client = new ShowMyHomework.Client();

client.searchSchools("Elk Valley Elementary").then(school => {
	client.login(school[0].id, "biglad1@biglads.com", "password").then(() => {
		client.getTasks().then(tasks => {
			var tasks_for_tomorrow = tasks.filter(task => {
				var today = new Date();
				var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
				var task_due = new Date(task.due_timestamp);
				
				return tomorrow.getFullYear() == task_due.getFullYear() && tomorrow.getMonth() == task_due.getMonth() && tomorrow.getDate() == task_due.getDate();
			});
			
			console.log(tasks_for_tomorrow); // Array of Task objects
		});
	});
});
```

### Getting yours and teachers comments on homework
```js
client.getHomework("homework id").then(homework => {
	homework.getSubmission().then(submisison => {
		submission.getComments().then(comments => {
			console.log(comments); // Array of SubmissionComment objects
		});
	});
});
```

## Notice
I am not responsible for anything you do using this library.