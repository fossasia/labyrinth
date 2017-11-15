
const tileWidth = 429.544; // px, real width
const tileHeight = 256.314; // px

function Level(specification)
{
  this.scale = 0.5;
  this.specification = specification;
  this.indexToPosition = function(x, y) {
    return {
      "x": tileWidth * (x + y) * this.scale,
      "y": tileHeight * (-x + y) * this.scale
    }
  };
  this.showIn = function(container){
    var minX = 0;
    var minY = 0;
    this.tiles.forEach(function(row, y){
      row.forEach(function(tile, x){
        const pixelPosition = me.indexToPosition(x, y);
        minY = pixelPosition.y < minY ? pixelPosition.y : minY;
        minX = pixelPosition.x < minX ? pixelPosition.x : minX;
        const position = {"x": x, "y": y};
        return tile.showIn(container);
      });
    });
    container.classList.add("tileContainer");
    container.style.left = -minX + "px";
    container.style.top = -minY + "px";
  };
  this.getTileAt = function(x, y){
    if (x < 0 || y < 0 || y >= this.tiles.length || x >= this.tiles[y].length) {
      return NullTile;
    }
    return this.tiles[y][x];
  }
  this.setStartTile = function(startTile) {
    this.startTile = startTile;
  }
  this.addPlayer = function(player) {
    player.startAt(this.startTile);
  }
  this.visit = function() {
    this.tiles.forEach(function(row){
      row.forEach(function(tile){
        tile.visit();
      });
    });
  };
  var me = this;
  this.startTile = null;
  this.tiles = specification.map(function(row, y){
    return row.map(function(tileSpecification, x){
      const position = {"x": x, "y": y};
      return tileSpecification.placeAtIn(position, me);
    });
  });
  if (this.startTile == null) {
    this.startTile = this.tiles[0][0];
  }
}
