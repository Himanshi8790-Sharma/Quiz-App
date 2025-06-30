let questions = [
    {
        question: "What does HTML stand for?" ,
        category: "HTML",
        answers: [
           { text: "Hyper Transfer Markup Language", correct: false },
            { text: "HyperText Markup Language", correct: true },
           { text: "HighText Machine Language", correct: false },
           { text: "None of the above", correct: false }
        ]
    },
    {
       question: "Which HTML tag is used to display a picture on a webpage?",
    category: "HTML",
    answers: [
      { text: "image", correct: false },
      { text: "src", correct: false },
       { text: "img", correct: true },
      { text: "pic", correct: false }
        ] 
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
       category: "HTML",
       answers: [
           { text: "style", correct: true },
           { text: "script", correct: false },
           { text: "css", correct: false },
           { text: "link", correct: false }
        ] 
    },
    {
       question: "Which tag is used to create a hyperlink?",
    category: "HTML",
    answers: [
           { text: "link", correct: false },
            { text: "a", correct: true },
           { text: "href", correct: false },
           { text: "hyperlink", correct: false }
        ] 
     },
      {
        question: "What is the correct HTML element for inserting a line break?",
    category: "HTML",
    answers: [
      { text: "br", correct: true },
      { text: "lb", correct: false },
      { text: "break", correct: false },
      { text: "hr", correct: false }
        ] 
     },
      {
         question: "Which CSS property is used to change the text color of an element?",
    category: "CSS",
    answers: [
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "color", correct: true },
      { text: "background-color", correct: false }
        ] 
     },
      {
        question: "How do you select an element with id 'demo'?",
    category: "CSS",
    answers: [
      { text: ".demo", correct: false },
      { text: "*demo", correct: false },
      { text: "#demo", correct: true },
      { text: "demo", correct: false }
        ] 
     },
      {
        question: "Which CSS property controls the text size?",
    category: "CSS",
    answers: [
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
      { text: "size", correct: false },
      { text: "text-style", correct: false }
        ] 
     },
      {
        question: "Which property is used to change the background color?",
    category: "CSS",
    answers: [
      { text: "color", correct: false },
      { text: "bgcolor", correct: false },
      { text: "bg-color", correct: false },
      { text: "background-color", correct: true }
        ] 
     },
      {
         question: "Which property is used for spacing inside an element?",
    category: "CSS",
    answers: [
      { text: "padding", correct: true },
      { text: "margin", correct: false },
      { text: "border", correct: false },
      { text: "space", correct: false }
        ] 
     },
     {
         question: "Which keyword is used to declare a variable in JavaScript?",
    category: "JS",
    answers: [
      { text: "int", correct: false },
      { text: "varname", correct: false },
      { text: "let", correct: true },
      { text: "String", correct: false }
        ] 
     },
     {
        question: "What will 'typeof []' return in JavaScript?",
    category: "JS",
    answers: [
      { text: "object", correct: true },
      { text: "array", correct: false },
      { text: "list", correct: false },
      { text: "undefined", correct: false }
        ] 
     },
     {
         question: "Which method is used to output data to the console?",
    category: "JS",
    answers: [
      { text: "print()", correct: false },
      { text: "console.log()", correct: true },
      { text: "echo()", correct: false },
      { text: "document.write()", correct: false }
        ] 
     },
     {
          question: "Which operator is used to compare both value and type?",
    category: "JS",
    answers: [
      { text: "==", correct: false },
      { text: "!=", correct: false },
      { text: "=", correct: false },
      { text: "===", correct: true }
        ] 
     },
     {
        question: "How do you define a function in JavaScript?",
    category: "JS",
    answers: [
      { text: "function myFunction() {}", correct: true },
      { text: "def myFunction() {}", correct: false },
      { text: "function:myFunction() {}", correct: false },
      { text: "func myFunction() {}", correct: false }
        ] 
     }
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
let filterQuestion = document.getElementById("categorySelect");
let filteredQuestions = [...questions];
 
//Store Question Number And Score
let currentQuestionIndex = 0;
let score = 0;
let intervalId;
let timeoutId;

// For Filter Question
filterQuestion.addEventListener("change",()=>{
  const selectedCategory = filterQuestion.value;
   if(selectedCategory === "All"){
    filteredQuestions = [...questions];
   }
   else {
    filteredQuestions = questions.filter(
      q => q.category === selectedCategory
    );
   }
   startQuiz();

});

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestions();
}  
//Question And Answers

function showQuestions(){
    resetState();      //Reset the previous Question   
    let currentQuestion = filteredQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Apply animation class
  questionElement.classList.remove("fadeIn"); // reset if already added
  void questionElement.offsetWidth; // trigger reflow
  questionElement.classList.add("fadeIn");

    
    let timeLeft = 10;
     intervalId = setInterval(()=>{
      if(timeLeft < 0){
        clearInterval(intervalId);
        return;
      }
      if (timeLeft <= 4) {
  timerElement.classList.add("blink");
} else {
  timerElement.classList.remove("blink");
}
      // console.log(timeLeft
      // )
      // ;
      timerElement.innerText = timeLeft;
      timeLeft--;
    },1000);

     timeoutId = setTimeout(()=>{
      handleNextButton();
    },10000);

   currentQuestion.answers.forEach(answer =>{
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");     //Css
      answerButtons.appendChild(button);   //html
      if(answer.correct){
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
   });
}

// Remove Previously Answer
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    timerElement.innerText = "";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
         clearInterval(intervalId);
         clearTimeout(timeoutId);

    }else{
        selectedBtn.classList.add("incorrect");
        
    }
    Array.from(answerButtons.children).forEach(button =>{
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Scored ${score} out of ${filteredQuestions.length }!`;
    blastConfetti();
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

 function handleNextButton(){
   currentQuestionIndex++;
   if(currentQuestionIndex < filteredQuestions.length){
    showQuestions();
   }
   else{
    showScore();
   }
 }
nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < filteredQuestions.length){
   handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();
// Confetti celebration
const blastConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};