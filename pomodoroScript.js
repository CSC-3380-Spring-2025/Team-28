// script.js
let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true;
let enteredTime = 25;
let hasRun = false;

function startTimer() {

    if (!hasRun){
    if(enteredTime != null && !(minutes === 0 && seconds === 0)){
        isPaused = false;
        timer = setInterval(updateTimer, 1000);
        hasRun = true;
    }
}
}

function updateTimer() {
    const timerElement =
        document.getElementById('timer');
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        alert('Time is up! Move to the next step.');
    } else if (!isPaused) {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 59;
            minutes--;
        }
    }
    timerElement.textContent = 
        formatTime(minutes, seconds);
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startNewTimer(mins){
    enteredTime = mins;
    minutes = enteredTime;
    seconds = 0;
    isPaused = true;
    const timerElement =
        document.getElementById('timer');
    timerElement.textContent =
        formatTime(minutes, seconds);
    clearInterval(timer);
    const pauseResumeButton =
        document.getElementById("pauseButton");
    pauseResumeButton.textContent = 'Resume';
    hasRun = false;
}

function togglePauseResume() {
    const pauseResumeButton =
        document.getElementById("pauseButton");
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = 'Resume';
    } else {
        hasRun = false;
        startTimer();
        pauseResumeButton.textContent = 'Pause';
    }
}

function restartTimer() {
    clearInterval(timer);
    minutes = enteredTime;
    seconds = 0;
    isPaused = true;
    const timerElement =
        document.getElementById('timer');
    timerElement.textContent =
        formatTime(minutes, seconds);
    const pauseResumeButton =
        document.getElementById("pauseButton");
    pauseResumeButton.textContent = 'Resume';
    hasRun = false;
}

function chooseTime() {
    const newTime = prompt('Enter new time in minutes:');
    if (!isNaN(newTime) && newTime > 0 && newTime <= 60 && Number.isInteger(parseInt(newTime))) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = true;
        const timerElement =
            document.getElementById('timer');
        timerElement.textContent =
            formatTime(minutes, seconds);
        clearInterval(timer);
        const pauseResumeButton =
            document.getElementById("pauseButton");
        pauseResumeButton.textContent = 'Resume';
        hasRun = false;
    } else {
        alert('Invalid input. Please enter a valid whole number greater than 0 and no greater than 60.');
    }
}
