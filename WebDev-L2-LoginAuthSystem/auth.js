// =========================================
// STORAGE KEYS
// =========================================

const USERS_KEY = "authenticationUsers";

const SESSION_KEY = "currentUser";


// =========================================
// GET USERS
// =========================================

function getUsers() {

    return JSON.parse(
        localStorage.getItem(USERS_KEY)
    ) || [];

}


// =========================================
// SAVE USERS
// =========================================

function saveUsers(users) {

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}


// =========================================
// SHA-256 PASSWORD HASH
// =========================================

async function hashPassword(password) {

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(password);


    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );


    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );


    const hashHex =
        hashArray
            .map(function(byte) {

                return byte
                    .toString(16)
                    .padStart(2, "0");

            })
            .join("");


    return hashHex;
}


// =========================================
// PASSWORD VALIDATION
// =========================================

function isValidPassword(password) {

    // At least 8 characters
    // At least 1 number

    const minimumLength =
        password.length >= 8;

    const containsNumber =
        /\d/.test(password);


    return (
        minimumLength &&
        containsNumber
    );
}


// =========================================
// EMAIL VALIDATION
// =========================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);
}


// =========================================
// DISPLAY MESSAGE
// =========================================

function showMessage(
    element,
    message,
    type
) {

    element.textContent = message;

    element.className =
        "message " + type;
}


// =========================================
// REGISTRATION
// =========================================

const registerForm =
    document.getElementById(
        "register-form"
    );


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById(
                        "register-username"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "register-email"
                    )
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById(
                        "register-password"
                    )
                    .value;


            const confirmPassword =
                document
                    .getElementById(
                        "confirm-password"
                    )
                    .value;


            const message =
                document.getElementById(
                    "register-message"
                );


            // =================================
            // BASIC VALIDATION
            // =================================

            if (
                username === "" ||
                email === "" ||
                password === "" ||
                confirmPassword === ""
            ) {

                showMessage(
                    message,
                    "Please fill in all fields.",
                    "error"
                );

                return;
            }// =================================
            // USERNAME VALIDATION
            // =================================

            if (username.length < 3) {

                showMessage(
                    message,
                    "Username must be at least 3 characters.",
                    "error"
                );

                return;
            }


            // =================================
            // EMAIL VALIDATION
            // =================================

            if (!isValidEmail(email)) {

                showMessage(
                    message,
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            // =================================
            // PASSWORD VALIDATION
            // =================================

            if (!isValidPassword(password)) {

                showMessage(
                    message,
                    "Password must contain at least 8 characters and 1 number.",
                    "error"
                );

                return;
            }


            // =================================
            // CONFIRM PASSWORD
            // =================================

            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            // =================================
            // GET EXISTING USERS
            // =================================

            const users = getUsers();


            // =================================
            // DUPLICATE USERNAME
            // =================================

            const usernameExists =
                users.some(
                    function(user) {

                        return (
                            user.username.toLowerCase() ===
                            username.toLowerCase()
                        );

                    }
                );


            if (usernameExists) {

                showMessage(
                    message,
                    "This username is already registered.",
                    "error"
                );

                return;
            }


            // =================================
            // DUPLICATE EMAIL
            // =================================

            const emailExists =
                users.some(
                    function(user) {

                        return (
                            user.email.toLowerCase() ===
                            email
                        );

                    }
                );


            if (emailExists) {

                showMessage(
                    message,
                    "This email is already registered.",
                    "error"
                );

                return;
            }


            // =================================
            // HASH PASSWORD
            // =================================

            const passwordHash =
                await hashPassword(password);


            // =================================
            // CREATE USER
            // =================================

            const newUser = {

                id:
                    Date.now().toString(),

                username:
                    username,

                email:
                    email,

                passwordHash:
                    passwordHash

            };


            users.push(newUser);


            // Save user

            saveUsers(users);


            // =================================
            // SUCCESS
            // =================================

            showMessage(
                message,
                "Registration successful! Redirecting to login...",
                "success"
            );


            // Clear formregisterForm.reset();


            // Redirect

            setTimeout(
                function() {

                    window.location.href =
                        "login.html";

                },
                1200
            );

        }
    );
}


// =========================================
// LOGIN
// =========================================

const loginForm =
    document.getElementById(
        "login-form"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const identifier =
                document
                    .getElementById(
                        "login-identifier"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "login-password"
                    )
                    .value;


            const message =
                document.getElementById(
                    "login-message"
                );


            // =================================
            // BASIC VALIDATION
            // =================================

            if (
                identifier === "" ||
                password === ""
            ) {

                showMessage(
                    message,
                    "Please enter your username/email and password.",
                    "error"
                );

                return;
            }


            // =================================
            // FIND USER
            // =================================

            const users = getUsers();


            const user =
                users.find(
                    function(item) {

                        return (
                            item.username.toLowerCase() ===
                            identifier.toLowerCase() ||

                            item.email.toLowerCase() ===
                            identifier.toLowerCase()
                        );

                    }
                );


            // =================================
            // INCORRECT CREDENTIALS
            // =================================

            if (!user) {

                showMessage(
                    message,
                    "Invalid username/email or password.",
                    "error"
                );

                return;
            }


            // =================================
            // HASH ENTERED PASSWORD
            // =================================

            const enteredPasswordHash =
                await hashPassword(password);


            // =================================
            // COMPARE HASHES
            // =================================

            if (
                enteredPasswordHash !==
                user.passwordHash
            ) {

                // Same generic message
                // so we don't reveal
                // which field was incorrect.

                showMessage(
                    message,
                    "Invalid username/email or password.",
                    "error"
                );

                return;
            }


            // =================================
            // CREATE SESSION
            // =================================

            const session = {

                userId:
                    user.id,

                username:
                    user.username,

                email:
                    user.email

            };


            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(session)
            );


            // =================================
            // REDIRECT
            // =================================

            window.location.href =
                "dashboard.html";

        }
    );
}// =========================================
// DASHBOARD PROTECTION
// =========================================

const dashboardUsername =
    document.getElementById(
        "dashboard-username"
    );


if (dashboardUsername) {

    const session =
        JSON.parse(
            localStorage.getItem(
                SESSION_KEY
            )
        );


    // =================================
    // NO SESSION
    // =================================

    if (!session) {

        window.location.href =
            "login.html";

    } else {

        // =================================
        // DISPLAY USER
        // =================================

        dashboardUsername.textContent =
            session.username;


        const userUsername =
            document.getElementById(
                "user-username"
            );


        const userEmail =
            document.getElementById(
                "user-email"
            );


        if (userUsername) {

            userUsername.textContent =
                session.username;
        }


        if (userEmail) {

            userEmail.textContent =
                session.email;
        }

    }
}


// =========================================
// LOGOUT
// =========================================

const logoutButton =
    document.getElementById(
        "logout-button"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function() {

            // Remove session

            localStorage.removeItem(
                SESSION_KEY
            );


            // Redirect

            window.location.href =
                "login.html";

        }
    );
}