document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.createElement("p");
    timerElement.id = "quiz-timer";
    timerElement.textContent = "Time Left: 10:00";
    document.querySelector(".quiz-info").appendChild(timerElement);

    let timeLeft = 600;

    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            window.location.href = "leaderboard.html";
        }

        timeLeft--;
    }

    const timerInterval = setInterval(updateTimer, 1000);


    let score = 0;
    let submittedAnswers = {
        q1: false,
        q2: false 
    };

    document.querySelectorAll(".question").forEach((question, index) => {
        const submitButton = question.querySelector(".submit-button");

        submitButton.addEventListener("click", function () {
            const inputs = question.querySelectorAll("input[type='radio'], input[type='checkbox']");
            let answered = false;

            inputs.forEach(input => {
                if (input.checked) {
                    answered = true;
                }
            });

            if (!answered) {
                alert("Please select an answer before submitting!");
                return;
            }

            if (index === 0) {
                const correctAnswer = document.getElementById("option1");
                if (correctAnswer.checked) {
                    score += 50;
                }
                submittedAnswers.q1 = true;
            } else if (index === 1) {
                const correctCheckboxes = [
                    document.getElementById("div"),
                    document.getElementById("span")
                ];
                
                correctCheckboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        score += 25;
                    }
                });

                submittedAnswers.q2 = true;
            }

            submitButton.disabled = true;
        });
    });

    document.querySelector(".finish-button button").addEventListener("click", function () {
        if (!submittedAnswers.q1 || !submittedAnswers.q2) {
            alert("Please submit answers for all questions before finishing!");
            return;
        }

        clearInterval(timerInterval);

        const scoreDisplay = document.createElement("h2");
        scoreDisplay.textContent = `Final Score: ${score} / 100`;
        scoreDisplay.classList.add("final-score");
        document.querySelector("main").appendChild(scoreDisplay);

        const countdownMessage = document.createElement("h3");
        countdownMessage.textContent = "Redirecting in 5...";
        countdownMessage.classList.add("redirect-message");
        document.querySelector("main").appendChild(countdownMessage);

        let countdown = 5;
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownMessage.textContent = `Redirecting in ${countdown}...`;

            if (countdown === 0) {
                clearInterval(countdownInterval);
                window.location.href = "leaderboard.html";
            }
        }, 1000);
    });
});
