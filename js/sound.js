const backgroundAudio = [
    {
        filename : "audio/music/bensound.com/epic1.mp3",
        backgroundSongName: "Epic",
        author: "bensound.com",
        legalNotice : "Music by bensound.com",
        link : "http://bensound.com/",
    },
    {
        filename : "audio/music/bensound.com/relaxing1.mp3",
        backgroundSongName: "Relaxing",
        author: "bensound.com",
        legalNotice : "Music by bensound.com",
        link : "http://bensound.com/",
    },
];
var backgroundNum = Math.floor(Math.random() * backgroundAudio.length);
var backgroundPlay = new Audio(backgroundAudio[backgroundNum].filename);
var audioPlay = null;
$( document ).ready(function() {
    startBackgroundAudio();
});
function updateLegalBackground() {
    $("#legalNotice").html(backgroundAudio[backgroundNum].legalNotice);
    $("#backgroundSongName").html(backgroundAudio[backgroundNum].backgroundSongName);
    $("#legalNotice").attr("href", backgroundAudio[backgroundNum].link);
    $("#backgroundSongAuthor").html(backgroundAudio[backgroundNum].author);;
}
function startBackgroundAudio() {
    updateLegalBackground();
    console.log(backgroundPlay);
    backgroundPlay.play();
}
function nextBackgroundAudio() {
    backgroundPlay.pause();
    if (backgroundNum !== backgroundAudio.length - 1) {
        backgroundNum = backgroundNum + 1
    }
    updateLegalBackground();
    backgroundPlay = new Audio(backgroundAudio[backgroundNum].filename);
    console.log(backgroundPlay);
    backgroundPlay.play();
}
function previousBackgroundAudio() {
    backgroundPlay.pause();
    if (backgroundNum !== 0) {
        backgroundNum = backgroundNum - 1
    }
    updateLegalBackground();
    backgroundPlay = new Audio(backgroundAudio[backgroundNum].filename);
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