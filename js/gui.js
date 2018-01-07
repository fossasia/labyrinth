// defined in /js/player.js
/* global newPlayer */
// defined in /js/levels.js
/* global createTestLevel */
var player;
var level;

window.addEventListener("load", function() {
    var container = document.getElementById("tiles");
    level = createTestLevel();
    level.showIn(container);

    var inputOptionsPromise = new Promise(function(resolve) {
        // input your character here in the form, "src_url": "character_name",
        resolve({
            "characters/sheep.svg": "Intelligent Sheep",
            "characters/robo.svg": "Robo",
            "characters/swammy.svg": "Swammy",
            "characters/monster.svg": "Monster",
            "characters/elephant.svg": "Elephant",
            "characters/shadowman.svg": "Shadowman",
            "characters/santa.svg": "Santa Clause",
            "characters/detective.svg": "Agent X"
            "characters/pixie.svg": "Forest Spirit",
        });

window.addEventListener("load", function()
{
  var container = document.getElementById("tiles");
  level = createTestLevel();
  level.showIn(container);
  
  var inputOptionsPromise = new Promise(function (resolve) {
    // input your character here in the form, "src_url": "character_name",
    resolve({
      "characters/sheep.svg": "Intelligent Sheep",
      "characters/robo.svg": "Robo",
      "characters/swammy.svg": "Swammy",
      "characters/monster.svg": "Monster",
      "characters/elephant.svg": "Elephant",
      "characters/shadowman.svg": "Shadowman",
      "characters/santa.svg": "Santa Clause",
      "characters/detective.svg":"Agent X",
      "characters/Geekomoji.svg": "Geekomoji",

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
        if (player.canMoveLeft()) {
            player.moveLeft();
        }
        player.logPosition();
    },
    "ArrowRight": function() {
        if (player.canMoveRight()) {
            player.moveRight();
        }
        player.logPosition();
    },
    "ArrowUp": function() {
        if (player.canMoveUp()) {
            player.moveUp();
        }
        player.logPosition();
    },
    "ArrowDown": function() {
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
$("#leftKey").on("click", function() {
    if (player.canMoveLeft()) {
        player.moveLeft();
    }
    player.logPosition();
});
$("#rightKey").on("click", function() {
    if (player.canMoveRight()) {
        player.moveRight();
    }
    player.logPosition();
});
$("#upKey").on("click", function() {
    if (player.canMoveUp()) {
        player.moveUp();
    }
    player.logPosition();
});
$("#downKey").on("click", function() {
    if (player.canMoveDown()) {
        player.moveDown();
    }
    player.logPosition();
});

window.addEventListener("keydown", function(event) {
    var handler = keyHandlers[event.key];
    if (handler) {
        handler();
        console.log("handled:", handler);
    } else {
        console.log(event);
    }
});
