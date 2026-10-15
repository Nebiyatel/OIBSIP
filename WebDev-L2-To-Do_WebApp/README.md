To-Do List Application 

1. Project Description
The To-Do List Application is a web-based task management tool developed using HTML, CSS, and JavaScript.
It allows users to add tasks, edit task descriptions, mark tasks as completed, and delete tasks. Tasks are organized into Pending and Completed sections to make task management easier.
The application uses the browser's localStorage to preserve tasks after the page is refreshed.

2. Features
Add new tasks
Display pending tasks
Display completed tasks
Mark pending tasks as completed
Edit existing tasks
Delete tasks
Display the number of pending tasks
Display the number of completed tasks
Show an empty-state message when a task list has no items
Record task creation timestamps
Record task completion timestamps
Save tasks in localStorage
Restore saved tasks after refreshing the page
Responsive user interface

3. Technologies Used
HTML5: Structures the application interface.
CSS3: Styles the task lists, buttons, and layout.
JavaScript: Implements task management and user interactions.
localStorage: Stores task information in the browser.

4. Project Structure
todo-app/
├── index.html
├── style.css
├── script.js
└── README.md
index.html — Contains the task input form and task list sections.
style.css — Defines the application's appearance and responsive layout.
script.js — Handles adding, editing, completing, deleting, and saving tasks.
README.md — Provides project documentation.

5. How to Run the Project
Open Visual Studio Code.
Open the todo-app folder.
Confirm that all project files are in the same folder.
Right-click index.html.
Select Open with Live Server.
The application will open in your browser.
No backend server or database installation is required.

6. How to Use
Add a Task
Enter a task in the input field.
Click Add Task.
The task will appear in the Pending section.
Complete a Task
Find a task in the Pending section.
Click its completion button.
The task will move to the Completed section.
Edit a Task
Find the task you want to change.
Click Edit.
Update the task description.
Save your changes.
Delete a Task
Find the task you want to remove.
Click Delete.
Confirm the deletion if prompted.
Track Tasks
The application automatically updates the pending and completed task counts.
Save Tasks
Tasks are saved in the browser's localStorage and remain available after a page refresh in the same browser, provided the stored data has not been cleared.

7. Data Storage
The application uses localStorage to store task information, including:
Task ID
Task description
Completion status
Creation timestamp
Completion timestamp
The data is stored locally in the browser rather than in a remote database.

8. Limitations
Tasks are stored in the current browser's localStorage.
Tasks are not automatically synchronized between devices or browsers.
Clearing the browser's stored site data may remove saved tasks.

9. Learning Outcomes
This project demonstrates:
DOM manipulation
JavaScript functions and event listeners
Arrays and objects
Conditional statements
Dynamic HTML element creation
Event handling
Date and time formatting
Browser localStorage
Data persistence
Responsive web design

10. Demo Video
Watch the demonstration of this project:
[Click here to watch the demo](https://youtu.be/Sy4OGPaK3kU?feature=shared)

 11. Author
Developed as part of a web development practical assignment.