
// defined in /js/tiles.js
/* global NullTile */

const tileWidth = 429.544; // px, real width
const tileHeight = 256.314; // px

// Level is used in /js/levels.js ignoring the error
// ignore JSHintBear
level.finish() {
  loadNextLevel();
}
function Level(specification)
{
  this.scale = 0.5;
  this.specification = specification;
  this.indexToPosition = function(position) {
    return {
      "x": tileWidth * (position.x + position.y) * this.scale,
      "y": tileHeight * (-position.x + position.y) * this.scale,
      "scale": this.scale,
      "tileWidth" : tileWidth * this.scale,
      "tileHeight" : tileHeight * this.scale,
    };
  };
  this.showIn = function(container){
    var minX = 0;
    var minY = 0;
    this.tiles.forEach(function(row, y){
      row.forEach(function(tile, x){
        const position = {"x": x, "y": y};
        const pixelPosition = me.indexToPosition(position);
        minY = pixelPosition.y < minY ? pixelPosition.y : minY;
        minX = pixelPosition.x < minX ? pixelPosition.x : minX;
        return tile.showIn(container);
      });
    });
    container.classList.add("tileContainer");
    // add width of left column to prevent its elements from overlapping tiles
    container.style.left = (-minX + $('.left-column').width()) + "px";
    // add height of top navbar to prevent it from overlapping tiles
    container.style.top = (-minY + $('.navbar-fixed').height()) + "px";
  };
  this.getTileAt = function(x, y){
    if (x < 0 || y < 0 || y >= this.tiles.length || x >= this.tiles[y].length) {
      return NullTile;
    }
    return this.tiles[y][x];
  };
  this.setStartTile = function(startTile) {
    this.startTile = startTile;
  };
  this.addPlayer = function(player) {
    player.startAt(this.startTile);
  };
  this.visit = function() {
    this.tiles.forEach(function(row){
      row.forEach(function(tile){
        tile.visit();
      });
    });
  };
  /*TODO
  * Update Level now 
  */
  this.finish = function() {
    // clear tiles
    swal({
          type: 'success',
          title: 'Level Complete',
    });
    $("#tiles").html("");
    startGame();
  };
  var me = this;
  this.startTile = null;
  this.tiles = specification.map(function(row, y){// defined in /js/tiles.js
    return row.map(function(tileSpecification, x){
      const position = {"x": x, "y": y};
      return tileSpecification.placeAtIn(position, me);
    });
  });
  if (this.startTile === null) {
    this.startTile = this.tiles[0][0];
  }
}
