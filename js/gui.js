// defined in /js/player.js
/* global newPlayer */
// defined in /js/levels.js
/* global createTestLevel */
var player;
var level;


window.addEventListener("load", function() {
  startGame(0);
});

function clearGame() {
  $("#tiles").html("");
}

function startGame(level) {
  var container = document.getElementById("tiles");
  level += 1;
  level = createTestLevel(level);
  level.showIn(container);

 var inputOptionsPromise = new Promise(function(resolve) {
    // input your character here in the form, "src_url": "character_name",
    resolve({
      "characters/golem.svg": "Golem",
      "characters/witch.svg": "Witch",

      "characters/block.svg": "Block",
      "characters/coolcat.svg": "Cool Cat"
      "characters/sheep.svg": "Intelligent Sheep",
      "characters/robo.svg": "Robo",
      "characters/swammy.svg": "Swammy",
      "characters/monster.svg": "Monster",
      "characters/elephant.svg": "Elephant",
      "characters/shadowman.svg": "Shadowman",
      "characters/santa.svg": "Santa Clause",
      "characters/detective.svg":"Agent X",
      "characters/Geekomoji.svg": "Geekomoji",

	  //added Character from RuKoBe
      "characters/OwnChar.png": "OwnChar",


      "characters/ninja.svg": "Ninja",
      "characters/Mr zero.svg":"Mr. Zero",
      "characters/Mrs zero.svg": "Mrs. Zero",
      "characters/stickman.svg": "Stickman",
      "characters/cpt_america.svg": "Captain America",
      "characters/daredevil.svg": "DancinDaredevil",
      "characters/MonsterJuice.svg": "Monster Juice",
      "characters/pixie.svg": "Forest Spirit",
      "characters/AngryBot.svg": "Angry Bot",
      "characters/deathnote.svg": "Death Note",

    });
  });
  player = newPlayer();
  level.addPlayer(player);

  swal({
    input: 'select',
    inputOptions: inputOptionsPromise,
    /* This is a way to get data quickly from swal */
    inputValidator: function(value) {
      player.changeCharacter(value);
    }
  });
}

var keyHandlers = {
    "ArrowLeft": function() {
        swal.close();
        if (player.canMoveLeft()) {
            stopAudio();
            player.moveLeft();
        }
        player.logPosition();
    },
    "ArrowRight": function() {
        swal.close();
        if (player.canMoveRight()) {
            stopAudio();
            player.moveRight();
        }
        player.logPosition();
    },
    "ArrowUp": function() {
        swal.close();
        if (player.canMoveUp()) {
            stopAudio();
            player.moveUp();
        }
        player.logPosition();
    },
    "ArrowDown": function() {
        swal.close();
        if (player.canMoveDown()) {
            stopAudio();
            player.moveDown();
        }
        player.logPosition();
    },
    "a": function() {
        level.visit();
    },
};

// On Screen Keys
$("#leftKey").on("click", keyHandlers.ArrowLeft);
$("#rightKey").on("click", keyHandlers.ArrowRight);
$("#upKey").on("click", keyHandlers.ArrowUp);
$("#downKey").on("click", keyHandlers.ArrowDown);

window.addEventListener("keydown", function(event) {
    var handler = keyHandlers[event.key];
    if (handler) {
        handler();
        console.log("handled:", handler);
    } else {
        console.log(event);
    }
});
