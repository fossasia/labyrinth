

var player;
var level;

window.addEventListener("load", function()
{
  var container = document.getElementById("tiles");
  level = createTestLevel();
  level.showIn(container);
  player = newPlayer();
  level.addPlayer(player);
});

var keyHandlers = {
  "ArrowLeft" : function() {
    if (player.canMoveLeft()) {
      player.moveLeft()
    };
    player.logPosition();
  },
  "ArrowRight" : function() {
    if (player.canMoveRight()) {
      player.moveRight()
    };
    player.logPosition();
  },
  "ArrowUp" : function() {
    if (player.canMoveUp()) {
      player.moveUp()
    };
    player.logPosition();
  },
  "ArrowDown" : function() {
    if (player.canMoveDown()) {
      player.moveDown()
    };
    player.logPosition();
  },
  "a" : function() {
    level.visit();
  },
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
