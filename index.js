document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    const scoreValue = document.getElementById("scoreValue");
    const maxScore = 500; // Adjust this to the maximum score for the game

    // Handle clicking on a question cell to display the modal
    const cells = document.querySelectorAll("td[data-toggle='modal']");
    const modalQuestion = document.getElementById("modalQuestion");
    const userAnswerInput = document.getElementById("userAnswer");
    const checkAnswerButton = document.getElementById("checkAnswer");

    // Function to display a message in a pop-up
    function showMessage(message) {
        alert(message);
    }

    // Function to reset the game
    function resetGame() {
        score = 0;
        scoreValue.textContent = score;
        userAnswerInput.value = "";
        $("#questionModal").modal("hide");
    }

    cells.forEach(function (cell) {
        cell.addEventListener("click", function () {
            const question = cell.getAttribute("data-question");
            const answer = cell.getAttribute("data-answer");

            // Update the modal content with the question
            modalQuestion.textContent = question;
            userAnswerInput.value = ""; // Clear the user's previous answer

            // Store the answer in a data attribute for later use
            checkAnswerButton.setAttribute("data-correct-answer", answer);

            // Attach the click event listener to the "Check Answer" button
            checkAnswerButton.addEventListener("click", function () {
                checkAnswer();
            });
        });
    });

    // Function to check the user's answer
    function checkAnswer() {
        const correctAnswer = checkAnswerButton.getAttribute("data-correct-answer");
        const userAnswer = userAnswerInput.value.trim().toLowerCase();

        if (userAnswer === correctAnswer.toLowerCase()) {
            // Correct answer
            score += 100; // You can adjust the score increment as needed
            scoreValue.textContent = score;

            if (score === maxScore) {
                showMessage("Congratulations! You've reached the maximum score.");
                resetGame();
            } else {
                showMessage(`Correct! The answer is "${correctAnswer}".`);
                resetGame();
            }
        } else {
            // Incorrect answer
            showMessage("Incorrect answer. Try again.");
        }
    }
});
