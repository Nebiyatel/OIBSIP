Login and Authentication System

1. Project Description
The Login and Authentication System is a front-end web application developed using HTML, CSS, and JavaScript.
It allows users to register an account, log in using their username or email address, access a dashboard, and log out.
For this assignment, user records and login session information are stored in the browser's localStorage.
Passwords are hashed using the SHA-256 algorithm before being stored. This project demonstrates basic authentication concepts for educational purposes.
Security notice: This is a client-side demonstration, not a production-ready authentication system. Secure applications should implement authentication on a server.

2. Features
User Registration
Register with a username, email address, and password
Confirm the password
Validate required fields
Require a username of at least three characters
Validate email format
Require a password of at least eight characters and one number
Check for duplicate usernames and email addresses
Store a password hash instead of the original password
User Login
Log in using a username or email address
Validate login credentials
Display a generic error message when credentials are incorrect
Create a browser-based login session after successful authentication
Protected Dashboard
Display the logged-in user's information
Redirect users to the login page if no session exists
Provide a logout button
Logout
Clear the current login session
Redirect the user to the login page
User Interface
Responsive design
Registration form
Login form
Dashboard page
Basic form validation
User feedback messages

3. Technologies Used
HTML5: Structures the registration, login, and dashboard pages.
CSS3: Styles the forms and dashboard.
JavaScript: Implements validation, registration, login, session handling, and logout.
localStorage: Stores user records and the current session.
Web Crypto API: Calculates SHA-256 password hashes.

4. Project Structure
authentication-system/
├── register.html
├── login.html
├── dashboard.html
├── style.css
├── auth.js
└── README.md
register.html — Provides the account registration form.
login.html — Provides the login form.
dashboard.html — Displays the protected dashboard.
style.css — Defines the appearance of all pages.
auth.js — Implements registration, password hashing, login, session management, and logout.
README.md — Provides project documentation.

5. How to Run the Project
Open Visual Studio Code.
Open the authentication-system folder.
Ensure all HTML, CSS, and JavaScript files are in the same folder.
Install the Live Server extension if necessary.
Right-click register.html.
Select Open with Live Server.
The registration page will open in your browser.
Use Live Server or another localhost development server rather than opening the HTML files directly. The Web Crypto API used for password hashing requires a secure context, which includes localhost in supported browsers.

6. How to Use
Step 1: Register
Open register.html.
Enter a username and email address.
Enter a password that has at least eight characters and one number.
Confirm the password.
Submit the registration form.
Step 2: Log In
Open the login page after successful registration.
Enter your username or email address.
Enter your password.
Submit the login form.
Step 3: Access the Dashboard
After successful login, the application redirects you to the dashboard.
The dashboard displays information about the logged-in user.
Step 4: Test Dashboard Protection
Log out.
Try opening dashboard.html directly.
The application should redirect you to the login page if the session is missing.
Step 5: Log Out
Click the logout button to clear the current session and return to the login page.

7. Data Storage
The application uses localStorage to store:
Registered usernames
Registered email addresses
Password hashes
Current session information
Passwords are hashed using SHA-256 before being stored. However, SHA-256 alone is not an appropriate password-storage solution for a real production system.

8. Security Limitations
This implementation is intended for learning and demonstration only.
Because authentication takes place entirely in the browser:
Users can inspect or modify localStorage.
Client-side dashboard protection can be bypassed.
Password hashes stored in the browser can be accessed.
Session information is not protected by a server.
SHA-256 does not provide the password-specific protections of algorithms such as Argon2id, bcrypt, or scrypt.
A production authentication system should use server-side authentication, HTTPS, secure session cookies, appropriate password hashing, and server-side authorization checks.

9. Learning Outcomes
This project demonstrates:
Form validation
JavaScript functions and conditionals
User registration and login workflows
Password hashing
Browser storage
Session management
Redirecting between pages
Basic access-control concepts
Logout functionality
Security considerations in web development

10. Demo Video
Watch the demonstration of this project:
[Click here to watch the demo](https://youtu.be/7KaDzqoekfE?feature=shared)  

11. Author
Developed as part of a web development practical assignment.

