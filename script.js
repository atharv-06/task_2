const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function formatTime(time) {
  const ms = time % 1000;
  const seconds = Math.floor(time / 1000) % 60;
  const minutes = Math.floor(time / 60000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = '00:00.000';
  lapList.innerHTML = '';
  isRunning = false;
}

function lap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapList.appendChild(li);
  }
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
