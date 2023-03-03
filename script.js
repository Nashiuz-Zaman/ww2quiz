'use strict';

// All declarations
const introPart = document.querySelector('.intro');
const rulesPart = document.querySelector('.game-rules');
const numberTotalQuestions = document.querySelector('.number-of-questions');
const quizPart = document.querySelector('.question-answer');
const btnStartList = document.querySelectorAll('.btn-start');
const btnRules = document.querySelector('.btn-rules');
const questionText = document.querySelector('.question-box');
const optionBtns = document.querySelectorAll('.option');
const backgroundImg = document.querySelector('.background-image');
const img = document.querySelector('.img');
const answersSection = document.querySelector('.answers');
const scoreEl = document.querySelector('.score-number');
const scoreWrong = document.querySelector('.score-wrong');
const tempResultMain = document.querySelector('.temporary-result');
const tempResultSuccess = document.querySelector(
  '.temporary-result-box-success'
);
const tempResultFailure = document.querySelector(
  '.temporary-result-box-failure'
);
const finalPage = document.querySelector('.game-end');
const finalScore = document.querySelector('.final-score');
const btnPlayAgain = document.querySelector('.btn-reset');
const btnContinue = document.querySelector('.continue');
const btnTryAgain = document.querySelector('.try-again');
const btnMidgameReset = document.querySelector('.btn-midgame-reset');

// functions for in-game
const generateQuestionWithImg = function () {
  // A random question is generated and is shown according to the question number with image
  arrayQuestionsMap = [...questions];
  randomIndex = Math.trunc(Math.random() * arrayQuestionsMap.length);
  [questionNum, question] = arrayQuestionsMap[randomIndex];
  questionText.textContent = question;
  img.src = `media/img/${questionNum}.jpg`;

  // Create an optionsMap using a for-of loop taking the options from answerOptions Map
  const optionsForSelectedQuestion = new Map();
  for (const [i, option] of answerOptions.get(questionNum).entries()) {
    optionsForSelectedQuestion.set(i, option);
  }

  // Answer Options are placed
  for (let i = 0; i < optionBtns.length; i++) {
    // remove disabled state from buttons
    optionBtns[i].disabled = false;
    optionBtns[i].disabled || optionBtns[i].classList.remove('option-disabled');

    // Convert optionsMap to optionsArray
    const arrayOptionsForSelectedQuestion = [...optionsForSelectedQuestion];

    // Selecting a random option "value" from optionsArray
    const index = Math.trunc(
      Math.random() * arrayOptionsForSelectedQuestion.length
    );
    optionBtns[i].textContent = arrayOptionsForSelectedQuestion[index][1];

    // Delete the option "key" from the optionsMap after the "value" has been used
    optionsForSelectedQuestion.delete(
      arrayOptionsForSelectedQuestion[index][0]
    );

    // original code
    // optionBtns[i].disabled = false;
    // optionBtns[i].disabled || optionBtns[i].classList.remove('option-disabled');
    // optionBtns[i].textContent = answerOptions.get(questionNum)[i];
  }
};

const showCorrectAnswerMsg = function () {
  tempResultMain.classList.add('flex');
  tempResultMain.classList.remove('hidden');
  tempResultSuccess.classList.add('flex');
  tempResultSuccess.classList.remove('hidden');
  tempResultFailure.classList.remove('flex');
  tempResultFailure.classList.add('hidden');
};

const showWrongAnswerMsg = function () {
  tempResultMain.classList.add('flex');
  tempResultMain.classList.remove('hidden');
  tempResultSuccess.classList.remove('flex');
  tempResultSuccess.classList.add('hidden');
  tempResultFailure.classList.add('flex');
  tempResultFailure.classList.remove('hidden');
};

const hideTempResultMainWindow = function () {
  tempResultMain.classList.remove('flex');
  tempResultMain.classList.add('hidden');
};

// Questions, Answer options and Correct answer MAPS
const questions = new Map([
  [1, 'Who was the leader of German Third Reich during the Second World War?'],
  [
    2,
    'Which of the following warships was the most feared battleship of World War II?',
  ],
  [
    3,
    'Who served as the Supreme Commander of the Allied Expeditionary Force in Europe?',
  ],
  [4, 'Which German general earned the title "The Desert Fox" to his name?'],
  [
    5,
    'On which day did the Allies land on the beaches of Normandy to invade Axis occupied Europe?',
  ],
  [
    6,
    `Which of the following was the largest Nazi concentration and death camp?
  `,
  ],
  [7, 'What city was the site of the 900-day siege during World War II?'],
  [
    8,
    'Which U.S. president won the Navy and Marine Corps Medal for his heroism during World War II?',
  ],
  [
    9,
    'What site became the symbol of the first stage of Nazi killing during the Holocaust?',
  ],
  [
    10,
    'This tank was called "Panzerkampfwagen V Panther". Which country used this tank in World War II?',
  ],
]);

const answerOptions = new Map([
  [
    1,
    [
      'Franklin D. Roosevelt',
      'Adolf Hitler',
      'Benito Mussolini',
      'Hermann Goering',
    ],
  ],
  [2, ['HMS King George V', 'HMS Hood', 'Bismarck', 'Lorraine']],
  [
    3,
    [
      'Bernard Law Montgomery',
      'Johannes Erwin Eugen Rommel',
      'Dwight D. Eisenhower',
      'Georgy Konstantinovich Zhukov',
    ],
  ],
  [
    4,
    [
      'Josef Ferdinand Jodl',
      'Erwin Eugen Rommel',
      'Wilhelm Bodewin Keitel',
      'Erich von Manstein',
    ],
  ],
  [5, ['July 6, 1944', 'September 1, 1939', 'June 6, 1944', 'April 30, 1945']],
  [6, ['Bełżec', 'Auschwitz-Birkenau', 'Treblinka', 'Chełmno']],
  [7, ['Leningrad', 'London', 'Stalingrad', 'Berlin']],
  [
    8,
    [
      'Ronald Reagan',
      'John F. Kennedy',
      'Jimmy Carter',
      'Dwight D. Eisenhower',
    ],
  ],
  [9, ['Babi yar', 'Dachau', 'London', 'Warsaw']],
  [10, ['Germany', 'Italy', 'Hungary', 'Finland']],
]);

const correctAnswers = new Map([
  [1, 'Adolf Hitler'],
  [2, 'Bismarck'],
  [3, 'Dwight D. Eisenhower'],
  [4, 'Erwin Eugen Rommel'],
  [5, 'June 6, 1944'],
  [6, 'Auschwitz-Birkenau'],
  [7, 'Leningrad'],
  [8, 'John F. Kennedy'],
  [9, 'Babi yar'],
  [10, 'Germany'],
]);

// Game initialization
rulesPart.style.display = 'none';
quizPart.classList.add('hidden');
finalPage.classList.add('hidden');
hideTempResultMainWindow();

// Start game
const totalQuestions = questions.size;
let score = 0;
let questionNum, question;
let arrayQuestionsMap;
let randomIndex;
numberTotalQuestions.textContent = questions.size;

// Rules button works this way
btnRules.addEventListener('click', function () {
  introPart.classList.add('hidden');
  rulesPart.style.display = 'flex';
});

// Start button works this way
for (const el of btnStartList) {
  el.addEventListener('click', function () {
    // Change to Game Mode
    introPart.classList.add('hidden');
    rulesPart.style.display = 'none';
    quizPart.classList.remove('hidden');
    backgroundImg.classList.add('opacity');

    // Generate random question with its' image and options
    generateQuestionWithImg();
  });
}

// Choosing Answers Buttons work this way
for (let i = 0; i < optionBtns.length; i++) {
  optionBtns[i].addEventListener('click', function () {
    // if Correct answer
    if (optionBtns[i].textContent === correctAnswers.get(questionNum)) {
      // Show Correct Answer Message
      score = score + 3;
      scoreEl.textContent = score;
      questions.delete(questionNum);
      showCorrectAnswerMsg();
    }

    // else when Wrong answer
    else {
      if (score > 0) {
        score = score - 1;
        scoreEl.textContent = score;
      } else {
        scoreEl.textContent = 0;
      }
      optionBtns[i].textContent = `❌ ${optionBtns[i].textContent}`;
      optionBtns[i].disabled = true;
      optionBtns[i].disabled && optionBtns[i].classList.add('option-disabled');

      // Show Wrong Answer Message
      if (questions.size === totalQuestions) {
        showWrongAnswerMsg();
        scoreWrong.classList.add('vis-hidden');
      } else {
        showWrongAnswerMsg();
        scoreWrong.classList.remove('vis-hidden');
      }
    }
  });
}

// Restart Mid-game Button works this way
btnMidgameReset.addEventListener('click', function () {
  location.reload();
});

// Continue Button works this way
btnContinue.addEventListener('click', function () {
  hideTempResultMainWindow();

  // If questions left
  if (questions.size >= 1) {
    // Generate random question with its' image and options
    generateQuestionWithImg();
  }

  // else no questions left
  else {
    quizPart.classList.add('hidden');
    backgroundImg.classList.remove('opacity');
    finalPage.classList.remove('hidden');
    finalPage.classList.add('flex');
    finalScore.textContent = score;
  }
});

// Try Again Button works this way
btnTryAgain.addEventListener('click', hideTempResultMainWindow);

// Start Again Button works this way
btnPlayAgain.addEventListener('click', function () {
  location.reload();
});
