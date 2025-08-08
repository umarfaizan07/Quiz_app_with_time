// --- Quiz App with Timer Logic ---

        // Get references to the HTML elements
        const questionElement = document.getElementById("questions");
        const answerButtons = document.getElementById("answerButtons");
        const nextButton = document.getElementById("next-btn");
        const timerBox = document.getElementById("timer-box");
        const timerValueElement = document.getElementById("timer-value");

        // The list of questions and their answers
        const questions = [
            {
                question: "What is the full form of API?",
                answers: [
                    { text: "Application Protocol Interface", correct: false },
                    { text: "Application Programming Interface", correct: true },
                    { text: "Automated Programming Interface", correct: false },
                    { text: "Apple Programming Interface", correct: false }
                ]
            },
            {
                question: "Which of these is a JavaScript framework?",
                answers: [
                    { text: "Python", correct: false },
                    { text: "Tailwind CSS", correct: false },
                    { text: "React", correct: true },
                    { text: "MongoDB", correct: false }
                ]
            },
            {
                question: "Which HTML tag is used for an ordered list?",
                answers: [
                    { text: "<ul>", correct: false },
                    { text: "<li>", correct: false },
                    { text: "<ol>", correct: true },
                    { text: "<dl>", correct: false }
                ]
            },
            {
                question: "Which planet is known as the 'Red Planet'?",
                answers: [
                    { text: "Earth", correct: false },
                    { text: "Mars", correct: true },
                    { text: "Jupiter", correct: false },
                    { text: "Venus", correct: false }
                ]
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;
        let timerInterval;
        const TIME_LIMIT = 15; // 15 seconds per question

        function startQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            nextButton.innerHTML = "Next"; // Reset button text
            nextButton.style.display = "none"; // Hide next button initially
            timerBox.style.display = "none"; // Hide timer initially
            showQuestion();
        }

        function showQuestion() {
            // Clear any previous answers
            answerButtons.innerHTML = ""; 
            
            // Get the current question from the array
            let currentQuestion = questions[currentQuestionIndex];
            let questionNumber = currentQuestionIndex + 1;
            questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

            // Start the timer for the new question
            startTimer();

            // Create buttons for each answer
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer.text;
                button.classList.add("btn");
                if (answer.correct) {
                    // Store the correct answer information in the button itself
                    button.dataset.correct = answer.correct;
                }
                button.addEventListener("click", selectAnswer);
                answerButtons.appendChild(button);
            });
        }

        function startTimer() {
            let timeLeft = TIME_LIMIT;
            timerBox.style.display = "block";
            timerValueElement.textContent = timeLeft;

            timerInterval = setInterval(() => {
                timeLeft--;
                timerValueElement.textContent = timeLeft;

                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    
                    // Automatically mark question as incorrect and move on
                    Array.from(answerButtons.children).forEach(button => {
                        if (button.dataset.correct === "true") {
                            button.classList.add("correct");
                        }
                        button.disabled = true;
                    });
                    
                    questionElement.innerHTML += "<br><span style='color:red;'>Time's up!</span>";
                    nextButton.style.display = "block";
                }
            }, 1000); // Update every second
        }

        function selectAnswer(e) {
            // Stop the timer immediately when an answer is selected
            clearInterval(timerInterval);
            
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";

            if (isCorrect) {
                selectedBtn.classList.add("correct");
                score++;
            } else {
                selectedBtn.classList.add("incorrect");
            }

            // Disable all other buttons after an answer is selected
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct"); // Highlight the correct answer
                }
                button.disabled = true; // Disable all buttons
            });

            nextButton.style.display = "block"; // Show the "Next" button
        }

        function showScore() {
            // Clear previous content
            answerButtons.innerHTML = "";
            nextButton.style.display = "none";
            timerBox.style.display = "none";

            questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
            
            // Change "Next" button to "Restart" and show it again
            nextButton.innerHTML = "Play Again";
            nextButton.style.display = "block";
        }

        function handleNextButton() {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
                nextButton.style.display = "none"; // Hide button until an answer is selected
            } else {
                showScore();
            }
        }

        // Event listener for the "Next" button
        nextButton.addEventListener("click", () => {
            if (currentQuestionIndex < questions.length) {
                handleNextButton();
            } else {
                startQuiz(); // Restart the quiz
            }
        });

        // Start the quiz when the page loads
        startQuiz();