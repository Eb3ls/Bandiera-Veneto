isPlaying = false;
audioTag = document.getElementById("musicPlayer");
prevButtonTag = document.getElementById("prev-button");
playButtonTag = document.getElementById("play-button");
nextButtonTag = document.getElementById("next-button");

progressSliderTag = document.getElementById("progressSlider");

timeTag = document.getElementById("currentTime");
totalDurationTag = document.getElementById("totalDuration");

// Boolean to check if the progress bar is being modified by the user with the mouse
toModify = true;

audioTag.addEventListener("timeupdate", function() {
    let currentTime = audioTag.currentTime;
    if (toModify) {
        progressSliderTag.value = currentTime;
    }
    timeTag.innerHTML = String(Math.floor(currentTime / 60)).padStart(2, '0') + ":" + String(Math.floor(currentTime % 60)).padStart(2, '0');
});

progressSliderTag.addEventListener("mouseup", function() {
    audioTag.currentTime = progressSliderTag.value;
    toModify = true;
});

progressSliderTag.addEventListener("mousedown", function() {
    toModify = false;
});

playButtonTag.addEventListener("click", function() {
    if (isPlaying) {
        audioTag.pause();
        isPlaying = false;
        playButtonTag.classList.remove("bi-pause-circle-fill");
        playButtonTag.classList.add("bi-play-circle-fill");
    } else {
        audioTag.play();
        isPlaying = true;
        playButtonTag.classList.remove("bi-play-circle-fill");
        playButtonTag.classList.add("bi-pause-circle-fill");
    }
});

totalDurationTag.innerHTML = String(Math.floor(audioTag.duration / 60)).padStart(2, '0') + ":" + String(Math.floor(audioTag.duration % 60)).padStart(2, '0');
progressSliderTag.max = audioTag.duration;
audioTag.volume = 0.3;

// Volume up or down if pressing + or - key
document.addEventListener("keydown", function(event) {
    if (event.key == "+") {
        audioTag.volume = Math.min(1, audioTag.volume + 0.1);
    } else if (event.key == "-") {
        audioTag.volume = Math.max(0, audioTag.volume - 0.1);
    }
});