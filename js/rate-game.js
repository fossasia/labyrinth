// Rate game buttons
function thankYouLike() {
    document.getElementById("rate-game").innerHTML = '<span class="card-title thanks"><a class="lang" key="thanks">Thank you! We\'re glad you enjoy the game! <3</a></span><br>';
    setTimeout(function() {
        document.getElementsByClassName("thanks")[0].style.opacity = "0"; 
    }, 2000);
    setTimeout(function() {
        document.getElementsByClassName("thanks")[0].style.display = "none";
    }, 2330);

}
function thankYouDislike() {
    document.getElementById("rate-game").innerHTML = '<span class="card-title thanks"><a class="lang" key="thanks">Thank you! We\'ll do our best to improve your experience.</a></span><br>';
    setTimeout(function() {
        document.getElementsByClassName("thanks")[0].style.opacity = "0"; 
    }, 2000);
    setTimeout(function() {
        document.getElementsByClassName("thanks")[0].style.display = "none";
    }, 2330);
} 