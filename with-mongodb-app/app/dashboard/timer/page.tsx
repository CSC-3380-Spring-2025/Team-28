'use client'

let timer: string | number | NodeJS.Timeout | undefined;
let minutes = 25;
let seconds = 0;
let isPaused = true;
let enteredTime: number | null = null;

function startTimer() {
    if(enteredTime != null){
        isPaused = false;
        timer = setInterval(updateTimer, 1000);
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
    timerElement!.textContent = 
        formatTime(minutes, seconds);
}

function formatTime(minutes: number, seconds: number) {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startNewTimer(mins: number){
    enteredTime = mins;
    minutes = enteredTime;
    seconds = 0;
    isPaused = true;
    const timerElement =
        document.getElementById('timer');
    timerElement!.textContent =
        formatTime(minutes, seconds);
    clearInterval(timer!);
    const pauseResumeButton =
        document.getElementById("pauseButton");
    pauseResumeButton!.textContent = 'Pause';
}

function togglePauseResume() {
    const pauseResumeButton =
        document.getElementById("pauseButton");
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(timer!);
        pauseResumeButton!.textContent = 'Resume';
    } else {
        startTimer();
        pauseResumeButton!.textContent = 'Pause';
    }
}

function restartTimer() {
    clearInterval(timer!);
    minutes = enteredTime!;
    seconds = 0;
    isPaused = true;
    const timerElement =
        document.getElementById('timer');
    timerElement!.textContent =
        formatTime(minutes, seconds);
    const pauseResumeButton =
        document.getElementById("pauseButton");
    pauseResumeButton!.textContent = 'Pause';
}

function chooseTime() {
    const newTime = prompt('Enter new time in minutes:');
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0;
        isPaused = true;
        const timerElement =
            document.getElementById('timer');
        timerElement!.textContent! =
            formatTime(minutes, seconds);
        clearInterval(timer!);
        const pauseResumeButton =
            document.getElementById("pauseButton");
        pauseResumeButton!.textContent = 'Pause';
    } else {
        alert('Invalid input. Please enter'+
              ' a valid number greater than 0.');
    }
}

export default function Timer() {


  return (
    <>
      <h1>Pomodoro Timer</h1>
      <div>
        <div id="timer">
          Pick a timer to start
        </div>
        <div>
          <button onClick={() => startNewTimer(25)}>Pomodoro</button>
          <button onClick={() => startNewTimer(5)}>Short Break</button>
          <button onClick={() => startNewTimer(30)}>Long Break</button>
        </div>
        <div>
          <button onClick={() => startTimer()}>Start</button>
          <button id="pauseButton" onClick={() => togglePauseResume()}>
            Pause
          </button>
          <button onClick={() => restartTimer()}>Restart</button>
          <button onClick={() => chooseTime()}>Choose Time</button>
        </div>
      </div>
      
    </>
  );
}
