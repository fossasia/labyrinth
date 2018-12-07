function newPlayer() {
    return new Player();
}

var NullLevel = {
  removePlayer: function(player) {},
  hide: function() {},
};

// Array of tiles that have been discovered
var seenTiles = [];

function createPlayerPicture() {
  var embed = document.createElement("embed");
  embed.id = "player"; // todo: add style information to css
  embed.src = "characters/robo.svg";
  embed.type = "image/svg+xml";
  embed.classList.add("image");
  embed.style.left = tileWidth / 2 + "px";
  embed.style.top = tileHeight / 2 + "px";
  var container = document.getElementById("tiles");
  container.appendChild(embed);
  return embed;
}

/*global runTeleport player:true*/
/*eslint no-undef: "error"*/

/*global swal*/
/*eslint no-undef: "error"*/

function runTeleport(){
	swal("Teleporting...", "", "info");
	var isPathValid = true;
	var isTpValid = true;
	var TpPath = document.querySelector(".pathIn").value.split(",");
	if(document.querySelector(".pathIn").value === ""){
		swal("No path", "Please provide a path.", "info");
	}else{
	for (var i=0; i < TpPath.length; i++){
		switch(TpPath[i]){
			case "UP":
				if (player.canMoveUp() === true){
					player.moveUp();
				}else{
					isTpValid = false;
				}
				break;
			case "DOWN":
				if (player.canMoveDown() === true){
					player.moveDown();
				}else{
					isTpValid = false;
				}
				break;
			case "LEFT":
				if (player.canMoveLeft() === true){
					player.moveLeft();
				}else{
					isTpValid = false;
				}
				break;
			case "RIGHT":
				if (player.canMoveRight() === true){
					player.moveRight();
				}else{
					isTpValid = false;
				}
				break;
			default:
				isPathValid = false;
		}
	
	}
	if (isPathValid === false){
		swal("Invalid path", "Please provide a valid path (eg. UP,LEFT,DOWN,RIGHT)", "error");
		document.querySelector(".pathIn").value = "";
	}else if (isTpValid === false) {
		swal("Inavlid direction","Teleport unsuccessful. One of the tile can't be accessed from this direction.", "error");
		document.querySelector(".pathIn").value = "";
	}else{
		swal("Done","Teleport successful!", "success");
		document.querySelector(".pathIn").value = "";
	}
  }
}

function Player() {
    this.currentTile = NullTile;
    this.moves = 0;

    // Create inventory instance
    this.inventory = new inventory();
    this.badges = new badges();
    this.currentLevel = NullLevel;
    this.picture = createPlayerPicture();
    this.levels = [];
	
	// For Checking whether a tile *object* has been discovered
	function isTileDiscovered(tile) {
    for (var i = 0; i < seenTiles.length; i++) {
        if (seenTiles[i] === tile) {
            return true;
        }
    }

    return false;
}
	
    this.enter = function(tile) {
        this.currentTile.playerLeaves(this);
        this.currentTile = tile;
        this.currentTile.playerEnters(this);
		if (isTileDiscovered(tile) === false){
			seenTiles.push(tile);
			$("#discoveryDisplay").html(seenTiles.length);
		}
        this.moves++;
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
        $("#playerMoves").html(this.moves);
        //Timer starts
        timeTicker.start();
    };
    this.showPictureIn = function(element) {
        element.appendChild(this.picture);
    };
    this.changeCharacter = function(characterSource) {
        this.picture.src = characterSource;
    };
    this.enterLevel = function(level) {
        this.addLevel(level);
        this.currentLevel.removePlayer(this);
        this.currentLevel.hide();
        this.currentLevel = level;
        this.currentLevel.addPlayer(this);
        this.currentLevel.show();
    };
    this.getLevelNamed = function(levelName) {
      return this.levels.find(function(level){return level.name == levelName;});
    };
    this.addLevel = function(level) {
      // add a level if it is not already added
      if (this.getLevelNamed(level.name)) {
        return;
      }
      this.levels.push(level);
    };
    this.addReachableLevel = function(level) {
      // please use this in tiles to go to a new level
      this.addLevel(level);
      this.askToChooseALevel();
    };
    this.askToChooseALevel = function() {
      var levelsToNames = {};
      this.levels.forEach(function(level){
        levelsToNames[level.name] = level.name;
      });
      var inputOptionsPromise = new Promise(function(resolve) {
        // input your character here in the form, "src_url": "character_name",
        resolve(levelsToNames);
      });
      var me = this;
      swal({
        title: "Choose a Level:",
        input: "select",
        inputOptions: inputOptionsPromise,
        inputValidator: function(levelName) {
          me.enterLevel(me.getLevelNamed(levelName));
        }
      });
    };
	this.numOfDiscoveredTiles = function(){
		return seenTiles.length;
	};
}
