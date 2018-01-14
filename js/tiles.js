/*jshint esversion: 6 */
// PlayerStartsAt is used in /js/levels.js, /js/level.js, /js/player.js ignoring the error
// ignore JSHintBear
const NullTile = {
    canEnterFromTheTop: function(player) {
        return false;
    },
    canEnterFromTheBottom: function(player) {
        return false;
    },
    canEnterFromTheRight: function(player) {
        return false;
    },
    canEnterFromTheLeft: function(player) {
        return false;
    },
    playerLeaves: function(player) {},
    placeAtIn: function() {
        return this;
    },
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
    embed.style.width = this.pixelPosition.tileWidth; // this scales ssdown everything
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
  player.showPictureIn(this.container);
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
PlacedTile.prototype.tileToTheBottom = function() {
    return this.level.getTileAt(this.position.x, this.position.y + 1);
};
PlacedTile.prototype.tileToTheTop = function() {
    return this.level.getTileAt(this.position.x, this.position.y - 1);
};
PlacedTile.prototype.tileToTheRight = function() {
    return this.level.getTileAt(this.position.x + 1, this.position.y);
};
PlacedTile.prototype.tileToTheLeft = function() {
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
  this.scrollToCenter();
};
PlacedTile.prototype.playerLeaves = function(player) {
    stopAudio();
    this.images.playerLeaves(player);
    this.whenPlayerLeaves(player);
};
PlacedTile.prototype.scrollToCenter = function() {
  const offset = $(this.images.container).children().offset();
  // calculate the top and left offsets in order for the tile to be centered
  const centerTop = window.innerHeight / 2 - tileHeight / 2;
  const centerLeft = window.innerWidth / 2 - tileWidth / 2;
  // animate the browser's scroll to center the tile
  $("html, body").animate({
    scrollTop: offset.top - centerTop,
    scrollLeft: offset.left - centerLeft
  }, 250);
};
function alertWarning(title, text) {
    swal({
        type: 'warning',
        title: title,
        text: text,
    });
}
function alertError(title, text) {
    swal({
        type: 'error',
        title: title,
        text: text,
    });
}
function alertSuccess(title, text) {
    swal({
        type: 'success',
        title: title,
        text: text,
    });
}
function alertInfo(title, text) {
    swal({
        type: 'info',
        title: title,
        text: text,
    });
}
function alertQuestion(title, text) {
    swal({
        type: 'question',
        title: title,
        text: text,
    });
}
function alertNormal(title, text) {
    swal({
        type: '',
        title: title,
        text: text,
    });
}
const OpenDoors = {
    // public
    canEnterFromTheTop: function(player) {
        return true;
    },
    canEnterFromTheBottom: function(player) {
        return true;
    },
    canEnterFromTheRight: function(player) {
        return true;
    },
    canEnterFromTheLeft: function(player) {
        return true;
    },
    canLeaveToTheTop: function(player) {
        return true;
    },
    canLeaveToTheBottom: function(player) {
        return true;
    },
    canLeaveToTheRight: function(player) {
        return true;
    },
    canLeaveToTheLeft: function(player) {
        return true;
    },
    viewFromTheTop: function(player) {
        this.wallTop.show();
    },
    viewFromTheLeft: function(player) {},
    viewFromTheRight: function(player) {
        this.wallRight.show();
    },
    viewFromTheBottom: function(player) {},
    whenPlayerLeaves: function(player) {},
    whenPlayerEnters: function(player) {
        this.visit(player);
        this.tileToTheLeft().viewFromTheRight(player);
        this.tileToTheRight().viewFromTheLeft(player);
        this.tileToTheTop().viewFromTheBottom(player);
        this.tileToTheBottom().viewFromTheTop(player);
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
    levelCode: 1,
    right: Object.assign({}, OpenDoors, {
        canEnterFromTheTop: function(player) {
            return false;
        },

        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/caro.svg");
        },
    }),
    top: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },

        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/caro.svg");
        },
    }),
    none: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/caro.svg");
            alertInfo("Welcome to the Labyrinth !", "Explore More ! Let's see what can find ...");
        },
    }),
    fairysWheel: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/animations/fairyswheel.svg");
            alertInfo("Round and round here we go!");
        },
    }),
    scene: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/live.svg");
            alertInfo("More to Go !", "");
        },
    }),
       design: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/handarjun.svg");
        },
    }),
    
    drawnbyme: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/saarthakdraw.svg");
            alertInfo("Saarthak Chaturvedi Drew this", "Should he become an artist?");

        },
    }),
    black: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/black.svg");
            alertInfo("Welcome to the Black Tile !", "");

        },
    }),
    drawn: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/drawn.svg");
        },
    }),
    orchestra: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/orchestra.svg");
        },
        visit: function() {
            if (player.inventory.has('Guitar')) {
                playAudio("guitar_strings.mp3");
                alertSuccess("Wow, an awesome solo perfomance, keep it up", "Your guitar skills looks fantastic");
                // We wont remove the guitar.
            } else {
                alertNormal(
                    "Hey, you forgot to take your guitar",
                    "There is your solo perfomance with guitar on stage and you have'nt brought it, please find it quick..."
                );
            }
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    guitarCase: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/guitar_case.svg");
        },
        visit: function() {
            alertInfo("Here's your guitar, now you can make your solo perfomance come true.");
            // Add guitar to inventory
            player.inventory.add(['Guitar', 'guitar.svg']);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    sun: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/coolsunbull.svg");
        },
        visit: function() {
            alertInfo("You should stay here forever.");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    wheel: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/animations/wheel.svg");
            alertInfo("Run Run Don't Stay here anymore !", "");
        },
        visit: function() {
        	playAudio("gears.mp3", 1);
        },
    }),
    fossasiaBullet: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/animations/fossasia_bullet.svg");
            alertInfo("So Close !", "");
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
    marina: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/marina.svg");
        },
        visit: function() {
            playAudio("Runnergarage.m4a", 1);
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
        	playAudio("suspense.mp3", 1);
            alertInfo("Pretty close. Keep going!!", "");
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
        visit: function(player) {
            playAudio("applause.mp3", 1);
            console.log("Courtesy of Daniel simons for his music, taken from freesoundeffects.com");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
            player.addReachableLevel(createForestLevel());
        },
    }),
    chessMate: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/topChess.svg");
            this.wallRight = this.createImage("tiles/rooms/door/rightChess.svg");
            this.ground = this.createImage("tiles/rooms/floor/banner-Chess.svg");
        },
        visit: function() {
            if(player.inventory.has('Key')){
                player.inventory.remove('Key');
                alertInfo('Checkmate!', 'Oops lost your key! Come on, try to get out from here.');
            }
            else{
                alertInfo("Checkmate", "Come on, Try to get out from here.");
            }
            playAudio('fire-truck-air-horn_daniel-simion.mp3', 1);
            console.log("Courtesy of Daniel simons for his music, taken from soundbible.com");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    chessStale: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topChess.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightChess.svg");
            this.ground = this.createImage("tiles/rooms/floor/banner-Chess.svg");
        },
        visit: function() {
            alertInfo("Stalemate", "Gotta go, Choose the Correct Path to escape from here");
            playAudio("arjun.mp3");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    //mine
    vector_pattern: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topChess.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightChess.svg");
            this.ground = this.createImage("tiles/rooms/floor/vector_pattern.svg");
        },
        visit: function() {
            alertInfo("Stalemate", "Gotta go, Choose the Correct Path to escape from here");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    //end
    treasure: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheLeft() {
            return false;
        },
        canLeaveToTheLeft() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/treasure.svg");
        },
        visit: function() {
            if (player.inventory.has('Key')) {
                alertSuccess("You got the treasure !", "there's more to find !");
                player.inventory.remove('Key');
            } else {
                alertNormal("You Need a Key ! Try to find it.", "");
            }
            player.badges.add(['Discoverer', 'Discoverer.png']);
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

            playAudio("discover.mp3", 1);
            alertInfo("You got something !", "Explore More ! Let's see what can find ...");

            alertInfo("You got the Key for the Treasure !", "Explore More ! Let's see what can find ...");

            // add item to inventory
            player.inventory.add(['Key', 'key.png']);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    yellowBoxes: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/handDrawnBoxes.svg");
        },
        visit: function() {
            playAudio("gears.mp3", 1);
        },
    }),
    batcave: Object.assign({}, OpenDoors, {
        canEnterFromTheLeft() {
            return false;
        },
        canLeaveToTheLeft() {
            return false;
        },

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
        canLeaveToTheTop: function(player) {
            return false;
        },
        visit: function() {
            // would show a message onto screen.
            // left open for future because no output div in hand
            alertInfo("All hail FOSSASIA!", "");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        },
    }),
    river: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return player.inventory.has('Boat');
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheLeft() {
            return false;
        },
        canLeaveToTheLeft() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/river.svg");
        },
        visit: function() {
        	 playAudio("watersound.mp3", 1);
             if (player.inventory.has('Boat')) {
             alertSuccess("You got the treasure !", "there's more to find !");
             player.inventory.remove('Boat');
            } else {
                alertNormal("You Need a Boat!", "");
            }
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    boat: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.ground = this.createImage("tiles/rooms/floor/boat.svg");
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
        },
        visit: function() {
            alertInfo("You found a boat !", "Keep it it might come handy when you found a treasure");
            // add item to inventory
            player.inventory.add(['Boat', 'boat.png']);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    outdoor: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallRight = this.createImage("tiles/rooms/wall/outwall.svg");
            this.ground = this.createImage("tiles/rooms/floor/out.svg");
            this.wallTop = this.createImage("tiles/rooms/door/out.svg");
        },
        visit: function() {
            player.badges.add(['Fresh Air', 'FreshAir.png']);
            playAudio("outdoor.mp3", 1);
            alertQuestion("Here you come to the Outdoor", "");
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
        visit: function() {
            playAudio("0x48piraj/composed/0x48piraj.mp3", 1);
        }
    }),
    texture: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/texture.svg");
        },
    }),
    sofa: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/topSofa.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightSofa.svg");
            this.ground = this.createImage("tiles/rooms/floor/sofa.svg");
        },
        visit: function() {
          if (player.inventory.has('Chocolate')) {
              alertInfo("Welcome to another chocolate kingdom", "");
              player.inventory.remove('Chocolate');
              this.wallTop = this.createImage("tiles/rooms/door/topChoc.svg");
              this.wallRight = this.createImage("tiles/rooms/wall/rightChoc.svg");
              this.ground = this.createImage("tiles/rooms/floor/chocolate.svg");
          }
          else {
            alertInfo("Get out!", "Yeah, I know no one's here, but basically you shouldn't invade someone else's living room.");
          }
            playAudio("spy.mp3", 1);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    minecraft: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topMinecraft.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightMinecraft.svg");
            this.ground = this.createImage("tiles/rooms/floor/minecraft.svg");
        },
        visit: function() {
            if (player.inventory.has('DiamondBlock')) {
                alertInfo("You have stumbled upon the world of Minecraft!", "");
                playAudio("minecraft/minecraft.mp3", 2);
                player.inventory.remove('DiamondBlock');
            } else {
                alertNormal("You need a diamond block to enter!", "");
            }
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    minecraftEntry: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topMinecraft.svg");
            this.wallRight = this.createImage("tiles/rooms/door/rightMinecraft.svg");
            this.ground = this.createImage("tiles/rooms/floor/minecraftEntry.svg");
        },
        visit: function() {
            playAudio("minecraft/minecraftEntry.mp3", 3);
            alertInfo("You found a diamond block!", "It is really expensive!");
            player.inventory.add(['DiamondBlock', 'diamondBlock.svg']);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    highLow: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/highLow.svg");
        },
        visit: function() {
            alertInfo("Everyone has highs and lows that they have to learn from.", "");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
            playAudio("background/yashkumarverma.github.io/pinballGame.mp3", 1);
        }
    }),
    Forbidden: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canEnterFromTheTop() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canLeaveToTheTop(){
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topForbidden.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightForbidden.svg");
            this.ground = this.createImage("tiles/rooms/floor/Forbidden.svg");
        },
        visit: function() {
            playAudio('creepy.mp3', 1);
            swal({
                type: 'info',
                title: 'Be careful with this place, used to be used for murder. So get away quickly from this place!',
            });
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    newYear: Object.assign({}, OpenDoors, {
        canLeaveToTheTop: function(player) {
            return true;
        },
        canLeaveToTheLeft: function(player) {
            return true;
        },
        canEnterFromTheTop: function(player) {
            return true;
        },
        canEnterFromTheLeft: function(player) {
            return true;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/topNewYear.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightNewYear.svg");
            this.ground = this.createImage("tiles/rooms/floor/floorNewYear.svg");
        },
        visit: function(player) {
        	playAudio("celebrate.mp3", 1);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
            alertNormal("Happy 2018!', 'It's new year already! Don't waste your time and explore!", "");
        }
    }),
    cricketGround: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/cricketGround.svg");
            alertNormal("Play Time!', 'Come on Let's Play some Cricket", "");
        },
        visit: function() {
        player.badges.add(['Cricketer', 'Cricketer.png']);
        this.wallTop.show();
        this.wallRight.show();
        this.ground.show();
      }
    }),
    cake: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return player.inventory.has('Spoon');
        },
        canLeaveToTheRight() {
            return true;
        },
        canEnterFromTheLeft() {
            return false;
        },
        canLeaveToTheLeft() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/Cake.svg");
        },
        visit: function() {
             if (player.inventory.has('Spoon')) {
             alertSuccess("You ate the CAKE!!", "YUM-YUM!!");
             player.inventory.remove('Spoon');
            } else {
                alertNormal("You Need a Spoon to eat this CAKE!", "");
            }
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    yellow: Object.assign({}, OpenDoors, {
        canEnterFromTheRight: function(player) {
            return false;
        },
        canLeaveToTheRight: function(player) {
            return false;
        },
        createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/door/yellowDoor.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/yellowRight.svg");
          this.ground = this.createImage("tiles/rooms/floor/yellowFloor.svg");
        },
        visit: function() {
          playAudio("idea.mp3");
          player.inventory.add(['Spoon', 'Spoon.png']);
          alertInfo("You are in the Yellow Floor Now.", "You found a spoon, keeping looking for a cake to eat it with :D");
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
        },
    }),
    red: Object.assign({}, OpenDoors, {
        createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/door/redDoor.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/redWall.svg");
          this.ground = this.createImage("tiles/rooms/floor/redFloor.svg");
           alertInfo("You are in the Red Floor Now.", "");
        }
    }),
    threeHeads: Object.assign({}, OpenDoors, {
        createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/door/top.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
          this.ground = this.createImage("tiles/rooms/floor/HandDrawnTile.svg");
           alertInfo("This tile was Hand-Drawn by Beta-King", "");
        }
    }),
    chocolate: Object.assign({}, OpenDoors, {
        canLeaveToTheTop: function(player) {
            return false;
        },
        canLeaveToTheRight: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/topChoc.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightChoc.svg");
            this.ground = this.createImage("tiles/rooms/floor/chocolate.svg");
        },
        visit: function() {
            alertInfo("You got a magic chocolate, Use it to turn the living room into a choco kingdom.");
            player.inventory.add(['Chocolate', 'choc.png']);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    winter1: Object.assign({}, OpenDoors, {
        canEnterFromTheRight: function(player) {
            return false;
        },
        canLeaveToTheRight: function(player) {
            return false;
        },
        canLeaveToTheBottom: function(player) {
            return true;
        },
        canLeaveToTheTop: function(player) {
            return true;
        },
        createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/door/top.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
          this.ground = this.createImage("tiles/animations/winter1.svg");
        },
        visit: function() {
          playAudio("jingleBellsKuba.mp3");
          alertInfo("It's winter here!");
          this.wallTop.show();
          this.wallRight.show();
          this.ground.show();
        },
    }),
    winter2: Object.assign({}, OpenDoors, {
        canEnterFromTheRight: function(player) {
            return false;
        },
        canEnterFromTheBottom: function(player) {
            return false;
        },
        canEnterFromTheLeft: function(player) {
            return true;
        },
        canLeaveToTheRight: function(player) {
            return true;
        },
        canLeaveToTheLeft: function(player) {
            return true;
        },
        canLeaveToTheBottom: function(player) {
            return false;
        },
        createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/door/top.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
          this.ground = this.createImage("tiles/rooms/floor/winter2.svg");
        },
    }),
};

const forest = {
    both: OpenDoors,
    levelCode: 2,
    right: Object.assign({}, OpenDoors, {
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topForest.svg");
            this.wallRight = this.createImage("tiles/rooms/door/rightForest.svg");
            this.ground = this.createImage("tiles/rooms/floor/Forest.svg");
             alertInfo("Welcome to the Forest", "Watch out for the Monsters");
        },
    }),
    top: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/topForest.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightForest.svg");
            this.ground = this.createImage("tiles/rooms/floor/Forest.svg");
        },
    }),
    none: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topForest.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightForest.svg");
            this.ground = this.createImage("tiles/rooms/floor/Forest.svg");
        },
    }),
    start: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topForest.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightForest.svg");
            this.ground = this.createImage("tiles/rooms/floor/Monster.svg");
        },
        visit: function() {
            alertInfo("Hi there", "I'm a nameless monster, welcome to my forest. You may find something interesting or equally horrific, let's rely on your fate.");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
};

const desert = {
    both: OpenDoors,
    right: Object.assign({}, OpenDoors, {
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topDesert.svg");
            this.wallRight = this.createImage("tiles/rooms/door/rightDesert.svg");
            this.ground = this.createImage("tiles/rooms/floor/Desert.svg");
             alertInfo("Welcome to the Lonely Desert.", "Don't Stop Anywhere, Try to escape from here quickly");
        },
    }),
    top: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/topDesert.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightDesert.svg");
            this.ground = this.createImage("tiles/rooms/floor/Desert.svg");
        },
    }),
    none: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topDesert.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightDesert.svg");
            this.ground = this.createImage("tiles/rooms/floor/Desert.svg");
        },
    }),
    drought: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return player.inventory.has('Camel');
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheLeft() {
            return false;
        },
        canLeaveToTheLeft() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topDesert.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightDesert.svg");
            this.ground = this.createImage("tiles/rooms/floor/drought.svg");
             alertInfo("Evade", "A very bug storm is to come.");
        },
        visit: function() {
            if (player.inventory.has('Camel')) {
                alertSuccess("You got the Camel !", "Escape from here !");
                player.inventory.remove('Camel');
            } else {
                alertNormal("You Need a Camel to Escape from the Storm!", "");
            }
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    camel: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.ground = this.createImage("tiles/rooms/floor/camel.svg");
            this.wallTop = this.createImage("tiles/rooms/wall/topDesert.svg");
            this.wallRight = this.createImage("tiles/rooms/door/rightDesert.svg");
        },
        visit: function() {
            alertInfo("You found a Camel !", "Use it whenever you face Storms.");
            // add item to inventory
            player.inventory.add(['Camel', 'camel.png']);
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),

    universe: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/universeFloor.svg");
        },
        visit: function() {
            swal('no one can escape from the universe');
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        },
  }),

    start: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/topDesert.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/rightDesert.svg");
            this.ground = this.createImage("tiles/rooms/floor/Desert.svg");
        },
        visit: function() {
            swal({
                type: 'info',
                title: 'Hi there',
                text: "I'm a nameless monster, welcome to my forest. You may find something interesting or equally horrific, let's rely on your fate.",
            });
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    lava: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canEnterFromTheBottom() {
            return true;
        },
        canLeaveToTheBottom() {
            return true;
        },
        canLeaveToTheRight() {
            return false;
        },
        visit: function() {
        alertWarning("The floor is lava!", "Better get outta here!");
        this.wallTop.show();
        this.wallRight.show();
        this.ground.show();
        },
        createImages: function() {
          this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
          this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
          this.ground = this.createImage("tiles/rooms/floor/lava.svg");
        },
      }),
};
const party = {
    both: OpenDoors,
    levelCode: 3,
    right: Object.assign({}, OpenDoors, {
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/party.svg");
             alertInfo("Party!", "Chill out, no traps, no monsters here.");
        },
    }),
    top: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/party2.svg");
        },
    }),
    none: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/party2.svg");
        },
    }),
    start: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/party.svg");
        },
        visit: function() {
            playAudio("dupstep.mp3");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show("title/rooms/floor/party_bright.svg");
        }

    }),
};

const Superhero = {
    both: OpenDoors,
    levelCode: 4,
    right: Object.assign({}, OpenDoors, {
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/superheroes/character1.svg");
        },
    }),
    first: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/superheroes/character4.svg");
        },
    }),
    none: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/");
            this.wallRight = this.createImage("tiles/rooms/wall/");
            this.ground = this.createImage("tiles/rooms/floor/superheroes/character2.svg");
        },
    }),
    start: Object.assign({}, OpenDoors, {
        canEnterFromTheRight() {
            return false;
        },
        canLeaveToTheRight() {
            return false;
        },
        canEnterFromTheTop: function(player) {
            return false;
        },
        canLeaveToTheTop: function(player) {
            return false;
        },
        createImages: function() {
            this.ground = this.createImage("tiles/rooms/floor/superheroes/character3.svg");
        },
        visit: function() {
            alertInfo("Wecome", "You will meet your worst doom in the batcave!");
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        },
    }),
    second: Object.assign({},OpenDoors,{
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/");
            this.wallRight = this.createImage("tiles/rooms/wall/");
            this.wallTop = this.createImage("tiles/rooms/wall/character1.svg");
        },
        visit: function() {
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
            alertInfo("","");
        },
    }),
     goal: Object.assign({},OpenDoors,{
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/wall/");
            this.wallRight = this.createImage("tiles/rooms/wall/");
            this.wallTop = this.createImage("tiles/rooms/floor/superheroes/captain.svg");
        },
        visit: function() {
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
    hulk: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/superheroes/hulk.svg");
        },
    }),
    top: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/superheroes/thor.svg");
        },
        visit: function() {
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
            alertInfo("Wecome", "Ready to feel the thunder!");
        }
    }),
    new: Object.assign({}, OpenDoors, {
        createImages: function() {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/wall/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/superheroes/ironman.svg");
        },
    }),
    art: Object.assign({}, OpenDoors, {
        canEnterFromTheLeft() {
            return false;
        },
        canLeaveToTheLeft() {
            return false;
        },
        createImages: function () {
            this.wallTop = this.createImage("tiles/rooms/door/top.svg");
            this.wallRight = this.createImage("tiles/rooms/door/right.svg");
            this.ground = this.createImage("tiles/rooms/floor/art.svg");
        },
        visit: function () {
            playAudio("audio/art/art.mp3");
            swal({
                type: 'info',
                title: 'Do you know this fact about, Mona Lisa?',
                text: "While some claim that Leonardo da Vinci’s most famous painting is a self-portrait of the artist himself in drag, research has concluded it is likely a portrait of a woman named Lisa Gherardini, a member of a prominent Florentine family and wife of a wealthy silk merchant.",
            });
            this.wallTop.show();
            this.wallRight.show();
            this.ground.show();
        }
    }),
};
