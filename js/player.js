
function newPlayer() {
  return new Player();
}

function Player() {
  this.currentTile = NullTile;
  this.enter = function(tile) {
    this.currentTile.playerLeaves(this);
    this.currentTile = tile;
    this.currentTile.playerEnters(this);
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
  };
  this.moveLeft = function() {
    this.enter(this.currentTile.tileToTheLeft());
  };
  this.moveUp = function() {
    this.enter(this.currentTile.tileToTheTop());
  };
  this.moveDown = function() {
    this.enter(this.currentTile.tileToTheBottom());
  };
  this.startAt = function(tile) {
    this.enter(tile);
  };
  this.logPosition = function() {
    console.log("Player position:", this.currentTile.position);
  };
}
