
const NullTile = {
  canEnterFromTheTop: function(player) {return false;},
  canEnterFromTheBottom: function(player) {return false;},
  canEnterFromTheRight: function(player) {return false;},
  canEnterFromTheLeft: function(player) {return false;},
  playerLeaves: function(player){},
  placeAtIn: function(){return this},
  showIn: function() {},
  visit: function() {},
}

function PlayerStartsAt(tileSpecification) {
  return {
    placeAtIn: function(position, level) {
      var tile = tileSpecification.placeAtIn(position, level);
      level.setStartTile(tile);
      return tile;
    }
  }
}

function PlacedTile(movementStrategy, position, level) {
  this.movementStrategy = movementStrategy;
  this.position = position;
  this.level = level;
  this.image = movementStrategy.createImage(position.x, position.y, level);
  this.showIn = function(container) {
    container.appendChild(this.image);
  };
  this.canLeaveToTheLeft = movementStrategy.canLeaveToTheLeft;
  this.canLeaveToTheRight = movementStrategy.canLeaveToTheRight;
  this.canLeaveToTheTop = movementStrategy.canLeaveToTheTop;
  this.canLeaveToTheBottom = movementStrategy.canLeaveToTheBottom;
  this.canEnterFromTheRight = movementStrategy.canEnterFromTheRight;
  this.canEnterFromTheLeft = movementStrategy.canEnterFromTheLeft;
  this.canEnterFromTheBottom = movementStrategy.canEnterFromTheBottom;
  this.canEnterFromTheTop = movementStrategy.canEnterFromTheTop;
  this.playerLeaves = movementStrategy.playerLeaves;
  this.playerEnters = movementStrategy.playerEnters;
  this.tileToTheBottom = function(){
    return this.level.getTileAt(this.position.x, this.position.y + 1);
  };
  this.tileToTheTop = function(){
    return this.level.getTileAt(this.position.x, this.position.y - 1);
  };
  this.tileToTheRight = function(){
    return this.level.getTileAt(this.position.x + 1, this.position.y);
  };
  this.tileToTheLeft = function(){
    return this.level.getTileAt(this.position.x - 1, this.position.y);
  };
  this.visit = function() {
    this.image.classList.add("visited");
  }
}

const OpenDoors = {
  // public
  canEnterFromTheTop: function(player) {return true;},
  canEnterFromTheBottom: function(player) {return true;},
  canEnterFromTheRight: function(player) {return true;},
  canEnterFromTheLeft: function(player) {return true;},
  canLeaveToTheTop: function(player) {return true;},
  canLeaveToTheBottom: function(player) {return true;},
  canLeaveToTheRight: function(player) {return true;},
  canLeaveToTheLeft: function(player) {return true;},
  playerLeaves: function(player){
    this.image.classList.remove("current");
  },
  playerEnters: function(player){
    this.image.classList.add("current");
    this.visit();
  },
  getImageFile: function() {return "tiles/door/both.svg"},
  // private
  placeAtIn: function(position, level) {
    return new PlacedTile(this, position, level);
  },
  createImage: function(x, y, level) {
    var embed = document.createElement("embed");
    embed.id = "tile-" + x + "-" + y;
    embed.src = this.getImageFile(x, y);
    embed.type = "image/svg+xml";
    embed.classList.add("tile");
    embed.style.width = tileWidth; // this scales down everything
    var position = level.indexToPosition(x, y);
    embed.style.left = position.x + "px";
    embed.style.top = position.y + "px";
    embed.style.zIndex = -x + y;
    return embed;
  },
};

const door = {
  both: OpenDoors,
  right: Object.assign({}, OpenDoors, {
    canEnterFromTheTop: function(player) {return false;},
    canLeaveToTheTop: function(player) {return false;},
    getImageFile: function() {return "tiles/door/right.svg";},
  }),
  top: Object.assign({}, OpenDoors, {
    canEnterFromTheRight() {return false;},
    canLeaveToTheRight() {return false;},
    getImageFile() {return "tiles/door/top.svg";},
  }),
  none: Object.assign({}, OpenDoors, {
    canEnterFromTheRight() {return false;},
    canLeaveToTheRight() {return false;},
    getImageFile() {return "tiles/door/none.svg";},
  })
}

const Wall = Object.assign({}, OpenDoors, {
  canEnterFromTheTop: function(player) {return false;},
  canEnterFromTheBottom: function(player) {return false;},
  canEnterFromTheRight: function(player) {return false;},
  canEnterFromTheLeft: function(player) {return false;},
  canLeaveToTheTop: function(player) {return false;},
  canLeaveToTheBottom: function(player) {return false;},
  canLeaveToTheRight: function(player) {return false;},
  canLeaveToTheLeft: function(player) {return false;},
  getImageFile: function() {return "tiles/wall/top.svg";},
});

const wall = {
  right: Wall,
  top: Object.assign({}, Wall, {
    getImageFile() {return "tiles/wall/right.svg";},
  })
}
