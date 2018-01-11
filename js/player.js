function newPlayer() {
    return new Player();
}

NullLevel = {
  removePlayer: function(player) {},
  hide: function() {},
};

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

function Player() {
    this.currentTile = NullTile;
    this.moves = 0;

    // Create inventory instance
    this.inventory = new inventory();
    this.badges = new badges();
    this.currentLevel = NullLevel;
    this.picture = createPlayerPicture();

    this.enter = function(tile) {
        this.currentTile.playerLeaves(this);
        this.currentTile = tile;
        this.currentTile.playerEnters(this);
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
    };
    this.showPictureIn = function(element) {
        element.appendChild(this.picture);
    };
    this.changeCharacter = function(character_source) {
        this.picture.src = character_source;
    };
    this.enterLevel = function(level) {
        this.currentLevel.removePlayer(this);
        this.currentLevel.hide();
        this.currentLevel = level;
        this.currentLevel.addPlayer(this);
        this.currentLevel.show();
    };
}
