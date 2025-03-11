document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");
    messageBox.style.border = "1px solid black";
    messageBox.style.width = "100%";
    messageBox.style.padding = "10px";
    messageBox.style.marginTop = "10px";
    messageBox.style.display = "none";
    loginForm.appendChild(messageBox);

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            showMessage("Please enter both username and password.", "error");
            return;
        }

        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {

                const user = users.find(user => user.username === username && user.email === password);

                if (user) {
                    showMessage("Login successful! Redirecting...", "success");

                    setTimeout(() => {
                        window.location.href = "course_view.html";
                    }, 2000);
                } else {
                    showMessage("Invalid username or password. Please try again.", "error");
                }
            })
            .catch(error => {
                showMessage("Error" + {error} + "fetching user data. Please try again later.", "error");
            });
    });

    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.style.display = "block";
        console.log(type);
    }
});
