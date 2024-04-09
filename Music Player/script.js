isPlaying = false;
// Boolean to check if the progress bar is being modified by the user with the mouse
toModify = true;
trackID = 0;

trackSet = [
    {
        title: "Bohemian Rapsody", 
        artist: "Queen", 
        src: "Music File/Bohemian-Rapsody.mp3",
        img: "Icons/Bohemian-Rapsody.jpg"
    }, 
    {
        title: "Billie Jean", 
        artist: "Michael Jackson",
        src: "Music File/Billie-Jean.mp3",
        img: "Icons/Billie-Jean.jpg"
    }, 
    {
        title: "Girls Just Wanna Have Fun", 
        artist: "Cyndi Lauper", 
        src: "Music File/Girls-just-wanna-have-fun.mp3",
        img: "Icons/Girls-just-wanna-have-fun.jpg"
    }
];

audioTag = document.getElementById("musicPlayer");
prevButtonTag = document.getElementById("prev-button");
playButtonTag = document.getElementById("play-button");
nextButtonTag = document.getElementById("next-button");

progressSliderTag = document.getElementById("progressSlider");
timeTag = document.getElementById("currentTime");
totalDurationTag = document.getElementById("totalDuration");

titleTag = document.querySelector("#trackTitle");
artistTag = document.querySelector("#trackArtist");
imgTrackTag = document.querySelector("#trackImg");

prevTitleTag = document.querySelector("#prevTrackTitle");
prevArtistTag = document.querySelector("#prevTrackArtist");
prevImgTrackTag = document.querySelector("#prevTrackImg");

nextTitleTag = document.querySelector("#nextTrackTitle");
nextArtistTag = document.querySelector("#nextTrackArtist");
nextImgTrackTag = document.querySelector("#nextTrackImg");

main = document.querySelector("main");

volumeControlTag = document.getElementById("volumeControl");

function loadPrevCard(trackID){
    prevID = 0;
    if(trackID > 0){
        prevID = trackID - 1;
    }
    else{
        prevID = trackSet.length - 1;
    }

    prevTitleTag.innerHTML = trackSet[prevID].title;
    prevArtistTag.innerHTML = trackSet[prevID].artist;
    prevImgTrackTag.src = trackSet[prevID].img;
}

function loadNextCard(trackID){
    nextID = 0;
    if(trackID < trackSet.length - 1){
        nextID = trackID + 1;
    }
    else{
        nextID = 0;
    }

    nextTitleTag.innerHTML = trackSet[nextID].title;
    nextArtistTag.innerHTML = trackSet[nextID].artist;
    nextImgTrackTag.src = trackSet[nextID].img;
}

/*
PARAMETRI: Traccia audio

RITORNA: None
*/
function loadMusicTrack(trackID){
    audioTag.src = trackSet[trackID].src;
    audioTag.load();

    titleTag.innerHTML = trackSet[trackID].title;
    artistTag.innerHTML = trackSet[trackID].artist;
    imgTrackTag.src = trackSet[trackID].img;
    main.style.backgroundImage = "url(" + trackSet[trackID].img + ")";

    loadPrevCard(trackID);
    loadNextCard(trackID);
}

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

audioTag.addEventListener("durationchange", function() {
    progressSliderTag.max = audioTag.duration;
    totalDurationTag.innerHTML = String(Math.floor(audioTag.duration / 60)).padStart(2, '0') + ":" + String(Math.floor(audioTag.duration % 60)).padStart(2, '0');
});

nextButtonTag.addEventListener("click", function() {
    if (trackID < trackSet.length - 1) {
        trackID++;
    } else {
        trackID = 0;
    }
    loadMusicTrack(trackID);
    audioTag.play();
    isPlaying = true;
    playButtonTag.classList.remove("bi-play-circle-fill");
    playButtonTag.classList.add("bi-pause-circle-fill");
});

prevButtonTag.addEventListener("click", function() {
    if (trackID > 0) {
        trackID--;
    } else {
        trackID = trackSet.length - 1;
    }
    loadMusicTrack(trackID);
    audioTag.play();
    isPlaying = true;
    playButtonTag.classList.remove("bi-play-circle-fill");
    playButtonTag.classList.add("bi-pause-circle-fill");
});

volumeControlTag.addEventListener("input", function(){
    audioTag.volume = volumeControlTag.value;
});

loadMusicTrack(0);
audioTag.volume = 0.3;
