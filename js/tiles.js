
const NullTile = {
  canEnterFromTheTop: function(player) {return false;},
  canEnterFromTheBottom: function(player) {return false;},
  canEnterFromTheRight: function(player) {return false;},
  canEnterFromTheLeft: function(player) {return false;},
  playerLeaves: function(player){},
  placeAtIn: function(){return this},
  showIn: function() {},
  visit: function() {},
  viewFromTheTop: function() {},
  viewFromTheLeft: function() {},
  viewFromTheRight: function() {},
  viewFromTheBottom: function() {},
};

function PlayerStartsAt(tileSpecification) {
  return {
    placeAtIn: function(position, level) {
      var tile = tileSpecification.placeAtIn(position, level);
      level.setStartTile(tile);
      return tile;
    }
  }
};

function ImageCollection(position, pixelPosition) {
  this.position = position;
  this.pixelPosition = pixelPosition;
  this.container = document.createElement("div");
  this.container.classList.add("tile");
  this.container.style.left = pixelPosition.x + "px";
  this.container.style.top = pixelPosition.y + "px";
  this.container.style.zIndex = -position.x + position.y;
}
ImageCollection.prototype.addImage = function(file) {
  var embed = document.createElement("embed");
  embed.id = "tile-" + this.position.x + "-" + this.position.y;
  embed.src = file;
  embed.type = "image/svg+xml";
  embed.style.width = this.pixelPosition.tileWidth; // this scales down everything
  embed.classList.add("image");
  this.container.appendChild(embed);
  return {
    hide: function() {
      embed.classList.add("hidden");
    },
    show: function() {
      embed.classList.remove("hidden");
    },
  };
};
ImageCollection.prototype.showIn = function(container) {
  container.appendChild(this.container);
};
ImageCollection.prototype.playerEnters = function(player) {
  this.container.classList.add("current");
};
ImageCollection.prototype.playerLeaves = function(player) {
  this.container.classList.remove("current");
};



function PlacedTile(movementStrategy, position, level) {
  this.movementStrategy = movementStrategy;
  this.position = position;
  this.level = level;
  Object.assign(this, movementStrategy);
  this.images = new ImageCollection(position, level.indexToPosition(position));
  this.createImages();
};
PlacedTile.prototype.showIn = function(container) {
  this.images.showIn(container);
};
PlacedTile.prototype.tileToTheBottom = function(){
  return this.level.getTileAt(this.position.x, this.position.y + 1);
};
PlacedTile.prototype.tileToTheTop = function(){
  return this.level.getTileAt(this.position.x, this.position.y - 1);
};
PlacedTile.prototype.tileToTheRight = function(){
  return this.level.getTileAt(this.position.x + 1, this.position.y);
};
PlacedTile.prototype.tileToTheLeft = function(){
  return this.level.getTileAt(this.position.x - 1, this.position.y);
};
PlacedTile.prototype.createImage = function(file) {
  var image = this.images.addImage(file);
  image.hide();
  return image;
};
PlacedTile.prototype.playerEnters = function(player) {
  this.images.playerEnters(player);
  this.whenPlayerEnters(player);
};
PlacedTile.prototype.playerLeaves = function(player) {
  this.images.playerLeaves(player);
  this.whenPlayerLeaves(player);
};

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
  viewFromTheTop: function(player) {
    this.wallTop.show();
  },
  viewFromTheLeft: function(player) {
  },
  viewFromTheRight: function(player) {
    this.wallRight.show();
  },
  viewFromTheBottom: function(player) {
  },
  whenPlayerLeaves: function(player){
  },
  whenPlayerEnters: function(player){
    this.visit();
    this.tileToTheLeft().viewFromTheRight();
    this.tileToTheRight().viewFromTheLeft();
    this.tileToTheTop().viewFromTheBottom();
    this.tileToTheBottom().viewFromTheTop();
  },
  visit: function() {
    this.wallTop.show();
    this.wallRight.show();
    this.ground.show();
  },
  createImages: function() {
    this.wallTop = this.createImage("tiles/rooms/door/top.svg");
    this.wallRight = this.createImage("tiles/rooms/door/right.svg");
    this.ground = this.createImage("tiles/rooms/floor/caro.svg");
  },
  // private
  placeAtIn: function(position, level) {
    return new PlacedTile(this, position, level);
  },
};

const door = {
  both: OpenDoors,
  right: Object.assign({}, OpenDoors, {
    canEnterFromTheTop: function(player) {return false;},
    canLeaveToTheTop: function(player) {return false;},
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/caro.svg");
    },
  }),
  top: Object.assign({}, OpenDoors, {
    canEnterFromTheRight() {return false;},
    canLeaveToTheRight() {return false;},
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/caro.svg");
    },
  }),
  none: Object.assign({}, OpenDoors, {
    canEnterFromTheRight() {return false;},
    canLeaveToTheRight() {return false;},
    canEnterFromTheTop: function(player) {return false;},
    canLeaveToTheTop: function(player) {return false;},
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
      this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/caro.svg");
    },
  })
};
