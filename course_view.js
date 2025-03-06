document.addEventListener("DOMContentLoaded", function () {
    const enrolledGrid = document.querySelector(".tile-grid.enrolled");
    const pendingGrid = document.querySelector(".tile-grid.pending");

    document.querySelectorAll(".accept-button").forEach(button => {
        button.addEventListener("click", function () {
            let courseTile = this.closest(".tile");
            moveToEnrolled(courseTile);
        });
    });

    document.querySelectorAll(".decline-button").forEach(button => {
        button.addEventListener("click", function () {
            let courseTile = this.closest(".tile");
            courseTile.remove();
        });
    });

    function moveToEnrolled(courseTile) {
        let courseImage = courseTile.querySelector("img");
        courseImage.src = "course1.jpg";

        courseTile.querySelector(".accept-button").remove();
        courseTile.querySelector(".decline-button").remove();

        let quizLink = document.createElement("a");
        quizLink.href = "attempt_quiz.html";
        quizLink.textContent = "Attempt Quiz";
        courseTile.appendChild(quizLink);

        enrolledGrid.appendChild(courseTile);
    }
    document.querySelectorAll(".tile").forEach(tile => {
        tile.addEventListener("mouseover", function () {
            this.style.backgroundColor = "#ffffff";
        });
        tile.addEventListener("mouseout", function () {
            this.style.backgroundColor = "";
        });
    });
});
