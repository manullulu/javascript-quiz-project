document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const timeRemainingContainer = document.getElementById("timeRemaining");
  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1,
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2,
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3,
    ),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Show first question
  showQuestion();

  function updateTimerDisplay() {
    const minutes = Math.floor(quiz.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  /************  TIMER  ************/
  let time;
  function startTimer() {
    clearInterval(time);
    updateTimerDisplay();
    time = setInterval(() => {
      quiz.timeRemaining--;
      let minutes = Math.floor(quiz.timeRemaining / 60);
      minutes = minutes.toString().padStart(2, "0");
      let seconds = Math.floor(quiz.timeRemaining % 60);
      seconds = seconds.toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
      if (quiz.timeRemaining <= 0) {
        // while this is negative run the above code on the set interval 1000;
        showResults();
      }
    }, 1000);
  }
  startTimer();

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  const restartButton = document.querySelector("#restartButton");
  restartButton.addEventListener("click", RestartQuiz);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    } else {
      questionContainer.innerText = ""; // 2. nettoyer
      choiceContainer.innerHTML = "";

      const question = quiz.getQuestion();
      console.log(question);
      console.log(question.text);
      question.shuffleChoices();
      questionContainer.innerText = question.text;
      progressBar.style.width = `${((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100}%`;
      questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`; //  This value is hardcoded as a placeholder
      question.choices.forEach((element) => {
        const input = document.createElement("input"); //creation de l'input
        input.type = "radio";
        input.name = "choice";
        input.value = element;
        const label = document.createElement("label");
        const br = document.createElement("br");
        label.innerHTML = element;
        choiceContainer.appendChild(input);
        choiceContainer.appendChild(label);
        choiceContainer.appendChild(br);
        console.log(element);
      });
    }
  }
  function nextButtonHandler() {
    let selectedAnswer = document.querySelectorAll(`input[name="choice"]`); // looks for all elements <input> with the atribute name === "choice".
    for (let i = 0; i < selectedAnswer.length; i++) {
      if (selectedAnswer[i].checked) {
        // checks all elements for the selected one, then runs it to the checkAnswer and reacts to that, then calls for the next question from quiz and start a new showQuestion.
        quiz.checkAnswer(selectedAnswer[i].value);
        quiz.moveToNextQuestion();
        showQuestion();
        return;
      }
    }
  }

  function showResults() { 
    quizView.style.display = "none"; 
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
    clearInterval(time);
  }
  function RestartQuiz() {
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quiz.timeLimit;

    endView.style.display = "none";
    quizView.style.display = "block";

    quiz.shuffleQuestions();
    showQuestion();
    startTimer();
  }
});
