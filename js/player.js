
function newPlayer() {
  return new Player();
}

function Player() {
  this.currentTile = NullTile;
  this.moves = 0;
  this.enter = function(tile) {
  this.currentTile.playerLeaves(this);
  this.currentTile = tile;
  this.currentTile.playerEnters(this);
  this.inventory = [];
  };

  // INVENTORY SYSTEM
  // add item to players inventory
  this.addToInventory = function(item) {
    this.inventory.push(item);
  };
  // check for item in players inventory
  this.hasInInventory  = function(item) {
    for (var i = this.inventory.length - 1; i >= 0; i--) {
      if(this.inventory[i] === item){
        return true;
      }else{
        return false;
      }
    }
  };
  this.canMoveLeft = function() {
    return this.currentTile.canLeaveToTheLeft(this) &&
           this.currentTile.tileToTheLeft().canEnterFromTheRight(this);
  };
  this.canMoveRight = function() {
    return this.currentTile.canLeaveToTheRight(this) &&
           this.currentTile.tileToTheRight().canEnterFromTheLeft(this);
  };
  this.canMoveUp = function() {
    return this.currentTile.canLeaveToTheTop(this) &&
           this.currentTile.tileToTheTop().canEnterFromTheBottom(this);
  };
  this.canMoveDown = function() {
    return this.currentTile.canLeaveToTheBottom(this) &&
           this.currentTile.tileToTheBottom().canEnterFromTheTop(this);
  };
  this.moveRight = function() {
    this.enter(this.currentTile.tileToTheRight());
    this.moves++;
  };
  this.moveLeft = function() {
    this.enter(this.currentTile.tileToTheLeft());
    this.moves++;
  };
  this.moveUp = function() {
    this.enter(this.currentTile.tileToTheTop());
    this.moves++;
  };
  this.moveDown = function() {
    this.enter(this.currentTile.tileToTheBottom());
    this.moves++;
  };
  this.startAt = function(tile) {
    this.enter(tile);
  };
  this.logPosition = function() {
    console.log("Player position:", this.currentTile.position);
    $("#playerMoves").html(this.moves);
  };
}
