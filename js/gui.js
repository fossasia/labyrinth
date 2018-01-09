// defined in /js/player.js
/* global newPlayer */
// defined in /js/levels.js
/* global createTestLevel */
var player;
var level;


window.addEventListener("load", function()
{
  var container = document.getElementById("tiles");
  level = createTestLevel();
  level.showIn(container);
  
  var inputOptionsPromise = new Promise(function (resolve) {
  // input your character here in the form, "src_url": "character_name",
    resolve({
         
      "characters/block.svg": "Block",
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
      "characters/OwnChar.png": "OwnChar"

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
});

var keyHandlers = {
    "ArrowLeft": function() {
        swal.close();
        if (player.canMoveLeft()) {
            player.moveLeft();
        }
        player.logPosition();
    },
    "ArrowRight": function() {
        swal.close();
        if (player.canMoveRight()) {
            player.moveRight();
        }
        player.logPosition();
    },
    "ArrowUp": function() {
        swal.close();
        if (player.canMoveUp()) {
            player.moveUp();
        }
        player.logPosition();
    },
    "ArrowDown": function() {
        swal.close();
        if (player.canMoveDown()) {
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
