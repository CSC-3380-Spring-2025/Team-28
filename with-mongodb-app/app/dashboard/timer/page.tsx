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
      <div className="px-10">
          <div className="pt-[1.5vh] pb-[1.5vh]"><h1 className="font-bold text-black text-2xl">Pomodoro Timer</h1></div>
          <div>
            <div className="pt-[1.5vh] pb-[2vh] w-full grid grid-cols-3">
              <button className="col-span-1 p-[2vh] bg-gray-200 text-black rounded-md font-bold  mr-[1.5vh]" onClick={() => startNewTimer(25)}>Pomodoro</button>
              <button className="col-span-1 p-[2vh] bg-gray-200 text-black rounded-md font-bold  mr-[1.5vh]" onClick={() => startNewTimer(5)}>Short Break</button>
              <button className="col-span-1 p-[2vh] bg-gray-200 text-black rounded-md font-bold " onClick={() => startNewTimer(30)}>Long Break</button>
            </div>
            <div className="pb-[2vh] grid grid-cols-5">
                <div className="col-span-1"></div>
                <div className="col-span-3 p-[2vh] bg-gray-400 text-black rounded-md font-bold">
                  <div id="timer" className="text-center bg-gray-200 text-black text-6xl rounded-md font-medium  pt-[10vh] pb-[10vh]">Pick a timer to start</div>
                </div>
                <div className="col-span-1"></div>
            </div>
            <div className="grid grid-cols-4">
              <button className="col-span-1 p-[2vh] bg-black text-white rounded-md font-bold mr-[1.5vh]" onClick={() => startTimer()}>Start</button>
              <button id="pauseButton" className="col-span-1 p-[2vh] bg-black text-white rounded-md font-bold mr-[1.5vh]" onClick={() => togglePauseResume()}>
                Pause
              </button>
              <button className="col-span-1 p-[2vh] bg-black text-white rounded-md font-bold mr-[1.5vh]" onClick={() => restartTimer()}>Restart</button>
              <button className="col-span-1 p-[2vh] bg-black text-white rounded-md font-bold mr-[1.5vh]" onClick={() => chooseTime()}>Choose Time</button>
            </div>
          </div>
          
      </div>
    </>
  );
}
