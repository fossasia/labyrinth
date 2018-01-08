const backgroundAudio = ["audio/music/epic1.mp3", "audio/music/relaxing1.mp3"];
var backgroundNum = Math.floor(Math.random() * backgroundAudio.length);
var backgroundPlay = new Audio(backgroundAudio[backgroundNum]);
var audioPlay = null;
$( document ).ready(function() {
    startBackgroundAudio();
});
function startBackgroundAudio() {
    console.log(backgroundPlay);
    backgroundPlay.play();
}
function nextBackgroundAudio() {
    backgroundPlay.pause();
    if (backgroundNum !== backgroundAudio.length - 1) {
        backgroundNum = backgroundNum + 1
    }
    backgroundPlay = new Audio(backgroundAudio[backgroundNum]);
    console.log(backgroundPlay);
    backgroundPlay.play();
}
function previousBackgroundAudio() {
    backgroundPlay.pause();
    if (backgroundNum !== 0) {
        backgroundNum = backgroundNum - 1
    }
    backgroundPlay = new Audio(backgroundAudio[backgroundNum]);
    console.log(backgroundPlay);
    backgroundPlay.play();
}
function stopBackgroundAudio() {
    backgroundPlay.pause();
}
function setVolume() {
    if (audioPlay !== null) {
        audioPlay.volume = document.getElementById("volume1").value;
    }
    backgroundPlay.volume = document.getElementById("volume1").value;
}
function stopAudio() {
    if (audioPlay !== null) {
        audioPlay.pause();
    }
}
function playAudio (audio) {
    audioPlay = new Audio("audio/" + audio);
    console.log(audioPlay);
    audioPlay.play();
}