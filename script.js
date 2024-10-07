const questions = [
    {
        question: "What is the past form of 'play'?",
        options: ["played", "playing", "plaied", "play"],
        answers: ["played"]
    },
    {
        question: "What is the past form of 'watch'?",
        options: ["watching", "watches", "watched", "watch"],
        answers: ["watched"]
    },
    {
        question: "What is the past form of 'work'?",
        options: ["worked", "working", "work", "works"],
        answers: ["worked"]
    },
    {
        question: "This 2000s computer is _______ than this 2023s computer",
        options: ["slower", "faster", "better", "worse"],
        answers: ["slower"]
    },
    {
        question: "This smartphone is _______ than my old one",
        options: ["smarter", "expensiver", "good", "worse"],
        answers: ["smarter"]
    },
    {
        question: "The 2010 Honda Civic is _______ than the 2023 Honda Civic",
        options: ["newer", "cheaper", "fastest", "more cheap"],
        answers: ["newer", "cheaper"]
    },
    {
        question: "What is the past form of 'paint'?",
        options: ["painted", "painting", "paint", "paints"],
        answers: ["painted"]
    },
    {
        question: "This chair is _______ than the sofa",
        options: ["less comfortable", "smaller", "more small", "best"],
        answers: ["less comfortable", "smaller"]
    },
    {
        question: "My old shoes are _______ than these new ones",
        options: ["worse", "better", "worst", "gooder"],
        answers: ["worse"]
    },
    {
        question: "What is the past form of 'visit'?",
        options: ["visited", "visits", "visiting", "visit"],
        answers: ["visited"]
    },
    {
        question: "This book is _______ than the last one",
        options: ["more interesting", "interesting", "less interesting", "most interesting"],
        answers: ["more interesting", "less interesting"]
    },
    {
        question: "This puzzle is _______ than the previous one",
        options: ["easier", "harder", "easy", "hard"],
        answers: ["easier", "harder"]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let time;

document.getElementById('start-button').addEventListener('click', startGame);

function startGame() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectOption(option));
        document.getElementById('options').appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(time);
    document.getElementById('next-button').style.display = 'none';
    document.getElementById('options').innerHTML = '';
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('time-bar').style.width = '100%';
}

function startTimer() {
    let timer = 10; // 10 seconds
    time = setInterval(() => {
        timer--;
        document.getElementById('time-bar').style.width = `${(timer / 10) * 100}%`;
        if (timer <= 0) {
            clearInterval(time);
            showCorrectAnswer();
            document.getElementById('next-button').style.display = 'block'; // Show the next button after time runs out
        }
    }, 1000);
}

function selectOption(selectedOption) {
    clearInterval(time);
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.answers.includes(selectedOption)) {
        score++;
        showCorrectAnswer(true);
    } else {
        showCorrectAnswer(false);
    }
    document.getElementById('next-button').style.display = 'block'; // Show the next button
}

function showCorrectAnswer(isCorrect) {
    const currentQuestion = questions[currentQuestionIndex];
    const buttons = document.querySelectorAll('#options button');

    buttons.forEach(button => {
        if (currentQuestion.answers.includes(button.innerText)) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });
}

document.getElementById('next-button').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    document.getElementById('quiz-container').style.display = 'none';
    const finalScoreDiv = document.createElement('div');
    finalScoreDiv.id = 'final-score';
    finalScoreDiv.innerHTML = `
        <h2>¡Juego Terminado!</h2>
        <p>Tu Puntuación: ${score}/${questions.length}</p>
        <button id="restart-button">Reiniciar</button>
    `;
    document.body.appendChild(finalScoreDiv);

    document.getElementById('restart-button').addEventListener('click', () => {
        location.reload();
    });
}
