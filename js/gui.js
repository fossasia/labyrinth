// defined in /js/player.js
/* global newPlayer */
// defined in /js/levels.js
/* global createTestLevel */
var player;

window.addEventListener("load", function() {
    startGame();
});

function startGame() {
    player = newPlayer();
    player.enterLevel(createFirstLevel());
    choosePlayerCharacter(player);
}

function saveTrigger() {
    saveGame(player);
}

function loadTrigger() {
    loadGame(player);
}

function choosePlayerCharacter(player) {
    var inputOptionsPromise = new Promise(function(resolve) {
        // input your character here in the form, "src_url": "character_name",
        resolve({
        	"characters/dog.svg": "Dog",
            "characters/thanos.svg": "Infinite Gauntlet",
            "characters/runner.svg": "Runner",
            "characters/golem.svg": "Golem",
            "characters/blackman.svg": "Blackman",
            "characters/witch.svg": "Witch",
            "characters/Zeichnung Lasse.svg": "The men",
            "characters/block.svg": "Block",
            "characters/coolcat.svg": "Cool Cat",
            "characters/sheep.svg": "Intelligent Sheep",
            "characters/robo.svg": "Robo",
            "characters/swammy.svg": "Swammy",
            "characters/monster.svg": "Monster",
            "characters/elephant.svg": "Elephant",
            "characters/shadowman.svg": "Shadowman",
            "characters/santa.svg": "Santa Clause",
            "characters/detective.svg": "Agent X",
            "characters/Geekomoji.svg": "Geekomoji",
            "characters/joker.svg": "Joker",
            "characters/OwnChar.png": "OwnChar",
            "characters/tardis.svg": "TARDIS",
            "characters/ninja.svg": "Ninja",
            "characters/Mr zero.svg": "Mr. Zero",
            "characters/Mrs zero.svg": "Mrs. Zero",
            "characters/stickman.svg": "Stickman",
            "characters/cpt_america.svg": "Captain America",
            "characters/daredevil.svg": "DancinDaredevil",
            "characters/MonsterJuice.svg": "Monster Juice",
            "characters/pixie.svg": "Forest Spirit",
            "characters/AngryBot.svg": "Angry Bot",
            "characters/deathnote.svg": "Death Note",
            "characters/cowboy.png": "Cowboy",
            "characters/ant.svg": "The AntMan",
            "characters/fireman.svg": "Fire Man",
            "characters/Archer.png": "Archer",
            "characters/programmer.png": "Programmer",
            "characters/oldman.svg": "oldman.svg",
            "characters/demonknight.png": "Demon Knight",
            "characters/ironman.svg": "Iron Man",
            "characters/weird.png": "Weird Man",
            "characters/telebishop.svg": "Telebishop",
            "characters/LittleAlien.png": "Little Alien",
            "characters/barbariansword.svg": "Barbarian Sword",
            "characters/rabbit.svg": "Rabbit",
        });
    });
    swal({
        title: "Choose a character",
        input: "select",
        inputOptions: inputOptionsPromise,
        /* This is a way to get data quickly from swal */
        inputValidator: function(value) {
            player.changeCharacter(value);
        },
        allowOutsideClick: false,
        allowEscapeKey: true,
        allowEnterKey: true
    });
}

var keyHandlers = {
    ArrowLeft: function() {
        swal.close();
        if (player.canMoveLeft()) {
            player.moveLeft();
        }
        player.logPosition();
    },
    ArrowRight: function() {
        swal.close();
        if (player.canMoveRight()) {
            player.moveRight();
        }
        player.logPosition();
    },
    ArrowUp: function() {
        swal.close();
        if (player.canMoveUp()) {
            player.moveUp();
        }
        player.logPosition();
    },
    ArrowDown: function() {
        swal.close();
        if (player.canMoveDown()) {
            player.moveDown();
        }
        player.logPosition();
    },
    a: function() {
        level.visit();
    }
};

// Reset button
function reset() {
    location.reload();
}

window.addEventListener("keydown", function(event) {
    var handler = keyHandlers[event.key];
    if (handler) {
        handler();
        console.log("handled:", handler);
    } else {
        console.log(event);
    }
});
