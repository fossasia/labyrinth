// PlayerStartsAt is used in /js/levels.js, /js/level.js, /js/player.js ignoring the error
// ignore JSHintBear
const NullTile = {
  canEnterFromTheTop: function(player) {return false;},
  canEnterFromTheBottom: function(player) {return false;},
  canEnterFromTheRight: function(player) {return false;},
  canEnterFromTheLeft: function(player) {return false;},
  playerLeaves: function(player){},
  placeAtIn: function(){return this;},
  showIn: function() {},
  visit: function() {},
  viewFromTheTop: function() {},
  viewFromTheLeft: function() {},
  viewFromTheRight: function() {},
  viewFromTheBottom: function() {},
};

// PlayerStartsAt is used in /js/levels.js ignoring the error
// ignore JSHintBear
function PlayerStartsAt(tileSpecification) {
  return {
    placeAtIn: function(position, level) {
      var tile = tileSpecification.placeAtIn(position, level);
      level.setStartTile(tile);
      return tile;
    }
  };
}

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
  /* 214.772 is half of the tile width while 128.157 is half the height of the tile */
  player.setPosition(this.pixelPosition.x+214.772, this.pixelPosition.y+128.157);
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
}
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

// door is used in /js/levels.js ignoring the error
// ignore JSHintBear
const door = {
  both: OpenDoors,
  right: Object.assign({}, OpenDoors, {
    canEnterFromTheTop: function (player) { return false; },
    canLeaveToTheTop: function (player) { return false; },
    createImages: function () {
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
  }),
  scene: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/live.svg");
    },
  }),
  black: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/black.svg");
    },
  }),
   drawn: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/drawn.svg");
    },
  }),
  wheel: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/animations/wheel.svg");
    },
  }),
    fossasiaBullet: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/animations/fossasia_bullet.svg");
    },
  }),
  blue: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/animations/drawing.svg");
    },
  }),
    green: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/live.svg");
    },
  }),
    star: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/self_made.svg");
    },
  }),
    fabricate: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/fabricate.svg");
    },
  }),
    aboutToFinish: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/animations/caro.svg");
    },
      visit: function() {
        swal({
          type: 'info',
          title: 'Pretty close. Keep going!!',
        });
        this.wallTop.show();
        this.wallRight.show();
        this.ground.show();
      },
  }),
  goal: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/goal.svg");
    },
    /* Override the function */
    visit: function() {
      swal({
        type: 'success',
        title: 'You win!',
        text: "Yay! You have won the game"
      });
      this.wallTop.show();
      this.wallRight.show();
      this.ground.show();
    },
  }),
  chessMate: Object.assign({}, OpenDoors, {
      createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/door/topChess.svg");
          this.wallRight = this.createImage("tiles/rooms/door/rightChess.svg");
          this.ground = this.createImage("tiles/rooms/floor/banner-Chess.svg");
      },
      visit: function() {
          swal({
            type: 'info',
            title: 'Checkmate',
          });
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
      }
  }),
  chessStale: Object.assign({}, OpenDoors, {
      canEnterFromTheRight() {return false;},
      canLeaveToTheRight() {return false;},
      canEnterFromTheTop: function(player) {return false;},
      canLeaveToTheTop: function(player) {return false;},
      createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/wall/topChess.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/rightChess.svg");
          this.ground = this.createImage("tiles/rooms/floor/banner-Chess.svg");
      },
      visit: function() {
          swal({
            type: 'info',
            title: 'Stalemate',
          });
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
      }
  }),
  treasure: Object.assign({}, OpenDoors, {
      canEnterFromTheRight() {return false;},
      canLeaveToTheRight() {return false;},
      canEnterFromTheLeft() {return false;},
      canLeaveToTheLeft() {return false;},
      canEnterFromTheTop: function(player) {return false;},
      canLeaveToTheTop: function(player) {return false;},
      createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
          this.ground = this.createImage("tiles/rooms/floor/treasure.svg");
      },
      visit: function() {
          if(player.inventory.has('Key')){
              swal({
            type: 'success',
            title: 'You got the treasure !',
            text: "there's more to find !"
            });
           player.inventory.remove('Key');
         }else
         {
          swal("You Need a Key !");
         }
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
      }
  }),
  treasureKey: Object.assign({}, OpenDoors, {
	createImages: function() {
      this.ground = this.createImage("tiles/rooms/floor/treasureKey.svg");
      this.wallTop = this.createImage("tiles/rooms/wall/treasureWall.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
    },
    visit: function() {
          swal({
	        type: 'info',
	        title: 'You got something !',
	        text: "Explore More ! Let's see what can find ..."
	      });
          // add item to inventory
          player.inventory.add(['Key','key.png']);
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
      }
   }),
  yellowBoxes: Object.assign({}, OpenDoors, {
  canEnterFromTheRight() {return false;},
  canLeaveToTheRight() {return false;},
  createImages: function() {
  this.wallTop = this.createImage("tiles/rooms/door/top.svg");
  this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
  this.ground = this.createImage("tiles/rooms/floor/handDrawnBoxes.svg");
    }
  }),  
  batcave: Object.assign({}, OpenDoors, {
    canEnterFromTheLeft() {return false;}, 
    canLeaveToTheLeft() {return false;},
   
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/wall/top.svg"); 
      this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/batcave.svg"); /*  svg_name is the name of your svg */
    },
  }),
   banner: Object.assign({}, OpenDoors, {
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
      this.ground = this.createImage("tiles/rooms/floor/banner-1.svg");
    },

    visit: function() {
    	// would show a message onto screen.
    	// left open for future because no output div in hand
      swal({
        type: 'info',
        title: 'All hail FOSSASIA!',
      });
      this.wallTop.show();
      this.wallRight.show();
      this.ground.show();
    },
  }),
  river: Object.assign({}, OpenDoors, {
      canEnterFromTheRight() {return player.inventory.has('Boat');},
      canLeaveToTheRight() {return false;},
      canEnterFromTheLeft() {return false;},
      canLeaveToTheLeft() {return false;},
      canEnterFromTheTop: function(player) {return false;},
      canLeaveToTheTop: function(player) {return false;},
      createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
          this.ground = this.createImage("tiles/rooms/floor/river.svg");
      },
      visit: function() {
          if(player.inventory.has('Boat')){
              swal({
              type: 'success',
              title: 'You got the treasure !',
              text: "there's more to find !"
              });
           player.inventory.remove('Boat');
         }else
         {
          swal("You Need a Boat!");
         }
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
      }
  }),
  boat: Object.assign({}, OpenDoors, {
	createImages: function() {
      this.ground = this.createImage("tiles/rooms/floor/boat.svg");
      this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
      this.wallRight = this.createImage("tiles/rooms/door/right.svg");
    },
    visit: function() {
          swal({
	        type: 'info',
	        title: 'You found a boat !',
	        text: "Keep it it might come handy"
	      });
          // add item to inventory
          player.inventory.add(['Boat','boat.png']);
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
      }
   }),
  outdoor: Object.assign({}, OpenDoors, {
    canEnterFromTheRight() { return false; },
    canLeaveToTheRight() { return false; },
    createImages: function () {
      this.wallRight = this.createImage("tiles/rooms/wall/outwall.svg");
      this.ground = this.createImage("tiles/rooms/floor/out.svg");
	this.wallTop = this.createImage("tiles/rooms/door/out.svg");
    },
	visit: function() {
          swal({
        	type: 'question',
        	title: "Do you like to go to outdoor?"
          });
          this.wallRight.show();
          this.wallTop.show();
          this.ground.show();
      }
  }),
      new: Object.assign({}, OpenDoors, {
  createImages: function() {
    this.wallTop = this.createImage("tiles/rooms/door/top.svg");
    this.wallRight = this.createImage("tiles/rooms/door/right.svg");
    this.ground = this.createImage("tiles/rooms/floor/new.svg");
  },
}),
plain: Object.assign({}, OpenDoors, {
createImages: function() {
  this.wallTop = this.createImage("tiles/rooms/door/top.svg");
  this.wallRight = this.createImage("tiles/rooms/door/right.svg");
  this.ground = this.createImage("tiles/rooms/floor/plain.svg");
},
}),
sofa: Object.assign({}, OpenDoors, {
canEnterFromTheRight() {return false;},
canLeaveToTheRight() {return false;},
createImages: function() {
  this.wallTop = this.createImage("tiles/rooms/door/topSofa.svg");
  this.wallRight = this.createImage("tiles/rooms/wall/rightSofa.svg");
  this.ground = this.createImage("tiles/rooms/floor/sofa.svg");
},
visit: function() {
      swal({
      type: 'info',
      title: 'Get out!',
      text: "Yeah, I know no one's here, but basically you shouldn't invade someone else's living room."
    });
      this.wallTop.show();
      this.wallRight.show();
      this.ground.show();
  }
}),
minecraft: Object.assign({}, OpenDoors, {
canEnterFromTheRight() {return false;},
canLeaveToTheRight() {return false;},
createImages: function() {
  this.wallTop = this.createImage("tiles/rooms/wall/topMinecraft.svg");
  this.wallRight = this.createImage("tiles/rooms/wall/rightMinecraft.svg");
  this.ground = this.createImage("tiles/rooms/floor/minecraft.svg");
},
visit: function() {
      swal({
      type: 'info',
      title: 'You have stumbled upon the world of Minecraft!',
    });
      this.wallTop.show();
      this.wallRight.show();
      this.ground.show();
  }
}),
highLow: Object.assign({}, OpenDoors, {
canEnterFromTheRight() {return false;},
canLeaveToTheRight() {return false;},
createImages: function() {
  this.wallTop = this.createImage("tiles/rooms/door/top.svg");
  this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
  this.ground = this.createImage("tiles/rooms/floor/highLow.svg");
},
visit: function() {
      swal({
        type: 'info',
        title: 'Everyone has highs and lows that they have to learn from.',
      });
      this.wallTop.show();
      this.wallRight.show();
      this.ground.show();
  }
}),
  newYear: Object.assign({}, OpenDoors, {
    canLeaveToTheTop: function(player) {return true;},
    canLeaveToTheLeft: function(player) {return true;},
    canEnterFromTheTop: function(player) {return true;},
    canEnterFromTheLeft: function(player) {return true;},
    createImages: function() {
      this.wallTop = this.createImage("tiles/rooms/door/topNewYear.svg");
      this.wallRight = this.createImage("tiles/rooms/wall/rightNewYear.svg");
      this.ground = this.createImage("tiles/rooms/floor/floorNewYear.svg");
    },
    visit: function(player) {
      this.wallTop.show();
      this.wallRight.show();
      this.ground.show();
      swal('Happy 2018!', 'It\'s new year already! Don\'t waste your time and explore!');
    }
  }),
};
