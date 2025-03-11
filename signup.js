document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const emailInput = document.getElementById("email");

    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.style.border = "1px solid black";
    messageBox.style.width = "100%";
    messageBox.style.padding = "10px";
    messageBox.style.marginTop = "10px";
    messageBox.style.display = "none";
    signupForm.appendChild(messageBox);

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const email = emailInput.value.trim();

        let errors = [];

        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
        if (!usernameRegex.test(username)) {
            errors.push("Invalid Username (Reason: Username must be 3-20 characters, start with a letter, and contain only letters, numbers, hyphens, or underscores.)");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'\",.<>?/`~]).{8,}$/;
        if (!passwordRegex.test(password)) {
            errors.push("Invalid Password (Reason: Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.)");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            errors.push("Invalid Email (Reason: Invalid email format. Example: user@example.com");
        }

        if (errors.length > 0) {
            showMessage(errors.join("<br><br>"), "error");
        } else {
            showMessage("Signup successful! Redirecting to login...", "success");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        }
    });

    function showMessage(message, type) {
        messageBox.innerHTML = message;
        messageBox.style.display = "block";
        console.log(type);
    }
});