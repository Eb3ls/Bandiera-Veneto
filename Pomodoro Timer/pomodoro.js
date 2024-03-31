// // Aggiunge un listener per l'evento di submit al form con id 'studyForm'
// document.getElementById('studyForm').addEventListener('submit', function (event) {
//     // Previene il comportamento di default dell'evento, che sarebbe il submit del form
//     event.preventDefault();

//     // Ottiene il tempo di studio inserito dall'utente e lo converte in un numero intero
//     const studyTime = parseInt(document.getElementById('studyTime').value, 10);
//     // Converte i minuti in secondi per l'animazione
//     const animationDuration = studyTime * 60;

//     // Imposta l'animazione con durata dinamica per gli pseudo-elementi ::before e ::after
//     const styleSheet = document.createElement("style");
//     styleSheet.innerText = `
//         .blob::before, .blob::after {
//             animation: rotate ${animationDuration}s linear forwards;
//         }`;
//     // Aggiunge il foglio di \stile creato all'elemento head del documento
//     document.head.appendChild(styleSheet);

//     // Calcola il tempo di fine aggiungendo la durata del timer al tempo corrente
//     const endTime = Date.now() + studyTime * 60000;

//     // Imposta un intervallo che si ripete ogni secondo
//     const interval = setInterval(function () {
//         const now = Date.now();
//         // Calcola la differenza tra il tempo di fine e il tempo corrente
//         const difference = endTime - now;

//         // Se la differenza è minore o uguale a 0, ferma l'intervallo
//         if (difference <= 0) {
//             clearInterval(interval);
//             // Pulisce il testo dell'elemento con id 'timerDisplay'
//             document.getElementById('timerDisplay').textContent = "";
//             return;
//         }

//         // Calcola i minuti e i secondi rimanenti
//         const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         // Visualizza il tempo rimanente nell'elemento con id 'timerDisplay'
//         //padstart aggiunge uno zero prima della stringa se non raggiunge almeno una lunghezza di 2
//         document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//     }, 1000);
// });

let start = document.getElementById('start');
let reset = document.getElementById('reset');
let ST = document.getElementById('studyTime');
let BT = document.getElementById('breakTime');
let S = document.getElementById('sessions');
let statusText = document.getElementById('status');
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

let studyTime = 0;
let breakTime = 0;
let session = 0;
let end = 0;
let time = 0;
let Timer;

function adjustValue(event) {
    let button = event.target;
    let current = button.parentElement.querySelector('input');
    if (button.id.includes('up')) {
        if(current.value == maxTime && current.id !== 'sessions'){
            return;
        }
        current.value = parseInt(current.value) + 1;
    } else {
        if((current.value === '1' && current.id !== 'sessions') || (current.value === '0' && current.id === 'sessions')){
            return;
        }
        current.value = parseInt(current.value) - 1;
    }
}

let buttons = [upST, downST, upS, downS, upBT, downBT];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', adjustValue);
}

document.querySelectorAll('input[type="number"]').forEach(function(input) {
    input.addEventListener('change', function(e) {
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
        else if (e.target.value < 1 && e.target.id !== 'sessions') {
            e.target.value = 1;
        }
        else if(e.target.value < 0 && e.target.id === 'sessions') {
            e.target.value = 0;
        }
        else if (e.target.value > maxTime && e.target.id !== 'sessions') {
            e.target.value = maxTime;
        }
    });
});

document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});


function breakTimer() {
    const difference = end - Date.now();
    if (difference <= 0) {
        clearInterval(Timer);
        statusText.textContent = "Session Time!";
        start = Date.now();
        end = start + 1000 * studyTime;
        Timer = setInterval(timer, 1000);
    }
    else{
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function timer() {
    const difference = end - Date.now();
    if (difference <= 0) {
        clearInterval(Timer);
        if(session === 0) {
            statusText.textContent = "Session Complete!";
            return;
        }
        else {
            start = Date.now();
            end = start + 1000 * breakTime;
            session = session - 1;
            statusText.textContent = "Break Time!";
            Timer = setInterval(breakTimer, 1000);
        }
    }
    else{
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function removeAnimation() {
    const styleSheets = document.head.getElementsByTagName("style");
    for(let i = 0; i < styleSheets.length; i++) {
        if(styleSheets[i].innerText.includes('.blob::after')) {
            document.head.removeChild(styleSheets[i]);
            break;
        }
    }
}

function startFunction() {
    studyTime = parseInt(ST.value, 10) * 60;
    breakTime = parseInt(BT.value, 10) * 60;
    session = parseInt(S.value, 10);
    statusText.textContent = "Session Time!";
    start = Date.now();
    end = start + 1000 * studyTime;
    Timer = setInterval(timer, 1000);
    
    const animationDuration = studyTime;
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .blob::after {
            animation: rotate ${animationDuration}s linear forwards;
        }`;
    document.head.appendChild(styleSheet);
}

function resetFunction() {
    clearInterval(Timer);
    document.getElementById('timerDisplay').textContent = "00:00";
    statusText.textContent = "Ready?";
    removeAnimation(); //TESTING
}

start.addEventListener('click', startFunction);
reset.addEventListener('click', resetFunction);


