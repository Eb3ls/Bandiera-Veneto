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
let studyTime = document.getElementById('studyTime');
let breakTime = document.getElementById('breakTime');
let sessions = document.getElementById('sessions');
let status = document.getElementById('status');
let upST = document.getElementById('upST');
let downST = document.getElementById('downST');
let upS = document.getElementById('upS');
let downS = document.getElementById('downS');
let upBT = document.getElementById('upBT');
let downBT = document.getElementById('downBT');
let count = 0;

function adjustValue(event) {
    let button = event.target;
    let current = button.parentElement.querySelector('input');
    if (button.id.includes('up')) {
        current.value = parseInt(current.value) + 1;
    } else {
        if(current.value === '1'){
            return;
        }
        current.value = parseInt(current.value) - 1;
    }
}

let buttons = [upST, downST, upS, downS, upBT, downBT];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', adjustValue);
}

function breakTimer() {
    count = count + 1;
    if (count === breakTime) {
        clearInterval(startBreak);
        document.getElementById('timerDisplay').textContent = "Session Complete!";
    }
}

function timer() {
    count = count + 1;
    if (count === time) {
        clearInterval(counter);
        var startBreak = setInterval(breakTimer, 1000);
        status.textContent = "Break Time!";
    }
}

function startButton() {
    var time = studyTime.value * 60;
    var breakTime = breakTime.value * 60;
    var session = sessions.value;
    var count = 0;
    count = setInterval(timer, 1000);
}

start.addEventListener('click', startButton());


