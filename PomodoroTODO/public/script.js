
let start = document.getElementById('start');
let reset = document.getElementById('reset');
let ST = document.getElementById('studyTime');
let BT = document.getElementById('breakTime');
let S = document.getElementById('sessions');
let statusText = document.getElementById('status');
let timerDisplay = document.getElementById('timerDisplay');
let studyForm = document.getElementById('studyForm');
let upST = document.getElementById('upST');
let downST = document.getElementById('downST');
let upS = document.getElementById('upS');
let downS = document.getElementById('downS');
let upBT = document.getElementById('upBT');
let downBT = document.getElementById('downBT');

const standartST = 25;
const standartS = 1;
const standartBT = 5;
const maxTime = 120;
const tick = 1000;

let studyTime = 0;
let breakTime = 0;
let session = 0;
let prevStatus = '';
let timeLeft;
let Timer;

function resetFunction() {
    clearInterval(Timer);
    timerDisplay.textContent = `${String(ST.value).padStart(2, '0')}:00`;
    statusText.textContent = "Ready?";
    start.textContent = 'Start';
    fadeOut(reset);
    fadeIn(studyForm);
    start.classList.remove('pauseIcon');
    start.classList.add('playIcon');
}

function adjustValue(event) {
    let button = event.target;
    let current = button.parentElement.querySelector('input');
    resetFunction();
    if (button.id.includes('up')) {
        if(current.value == maxTime && current.id !== 'sessions'){
            return;
        }
        current.value = parseInt(current.value) + 1;
    } else {
        if(current.value === '1'){
            return;
        }
        current.value = parseInt(current.value) - 1;
    }
    if(button.id.includes('ST')){
        timerDisplay.textContent = `${String(current.value).padStart(2, '0')}:00`;
    }
}

let buttons = [upST, downST, upS, downS, upBT, downBT];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', adjustValue);
}

document.querySelectorAll('input[type="number"]').forEach(function(input) {
    input.addEventListener('change', function(e) {
        resetFunction();
        if (isNaN(e.target.value) || e.target.value === '') {
            if(e.target.id === 'studyTime') {
                e.target.value = standartST;
            }
            else if(e.target.id === 'sessions') {
                e.target.value = standartS;
            }
            else if(e.target.id === 'breakTime') {
                e.target.value = standartBT;
            }
        } 
        else if (e.target.value < 1) {
            e.target.value = 1;
        }
        else if (e.target.value > maxTime && e.target.id !== 'sessions') {
            e.target.value = maxTime;
        }
        if(e.target.id === 'studyTime') {
            timerDisplay.textContent = `${String(e.target.value).padStart(2, '0')}:00`;
        }
    });
});

document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});

function fadeIn(element) {
    element.classList.add('fadeIn');
    element.classList.remove('fadeOut');
}

function fadeOut(element) {
    element.classList.add('fadeOut');
    element.classList.remove('fadeIn');
}

function updateTime() {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft % 60);
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function pauseTimer() {
    clearInterval(Timer);
    prevStatus = statusText.textContent;
    statusText.textContent = 'Pausa';
    start.textContent = 'Continua';
    start.classList.remove('pauseIcon');
    start.classList.add('playIcon');
    fadeIn(reset);
    fadeIn(studyForm);
}

function riprendi() {
    statusText.textContent = prevStatus;
    if(prevStatus === 'Session Time!') {
        Timer = setInterval(timer, tick);
    }
    else {
        Timer = setInterval(breakTimer, tick);
    }
    start.textContent = 'pause';
    fadeOut(reset);
    fadeOut(studyForm);
    start.classList.remove('playIcon');
    start.classList.add('pauseIcon');
}


function breakTimer() {
    updateTime();
    if (timeLeft <= 0) {
        clearInterval(Timer);
        timeLeft = studyTime;
        statusText.textContent = "Session Time!";
        Timer = setInterval(timer, tick);
    }
}

function timer() {
    updateTime();
    if (timeLeft === 0) {
        console.log('timeLeft', timeLeft);
        clearInterval(Timer);
        if(session === 1) {
            resetFunction();
            return;
        }
        else {
            timeLeft = breakTime;
            session = session - 1;
            statusText.textContent = "Break Time!";
            Timer = setInterval(breakTimer, tick);
        }
    }
}

function startFunction() {
    if(statusText.textContent === 'Ready?') {
        studyTime = parseInt(ST.value, 10) * 60;
        breakTime = parseInt(BT.value, 10) * 60;
        session = parseInt(S.value, 10);
        statusText.textContent = "Session Time!";
        timeLeft = studyTime;
        Timer = setInterval(timer, tick);
        start.textContent = 'pause'
        fadeOut(studyForm);
        start.classList.remove('playIcon');
        start.classList.add('pauseIcon');
    }
    else if((statusText.textContent === 'Session Time!') || (statusText.textContent === 'Break Time!')) {
        pauseTimer();
    }
    else if(statusText.textContent === 'Pausa') {
        riprendi();
    }
}

start.addEventListener('click', startFunction);
reset.addEventListener('click', resetFunction);

timerDisplay.textContent = `${String(ST.value).padStart(2, '0')}:00`;
console.log('timerDisplay.textContent', timerDisplay.textContent)
reset.classList.add('fadeOut')
