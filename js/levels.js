// defined in /js/tiles.js
/* global NullTile */
/* global door */
/* global PlayerStartsAt */

// defined in /js/level.js
/* global Level */

// createTestLevel is used in /js/gui.js ignoring the error
// ignore JSHintBear
function createTestLevel(level) {
  if(level == 2) {
    /* 2nd level */
    return new Level([
      [forest.none, forest.right, forest.right, forest.right, forest.right, forest.none],
      [forest.none, forest.top, forest.both, forest.both, forest.both, forest.both],
      [forest.none, forest.top, PlayerStartsAt(forest.start), forest.both, forest.both, forest.top],
      [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
      [forest.none, forest.top, forest.top, forest.both, forest.top, forest.top],
      [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
      [NullTile, forest.none, forest.none, forest.none, forest.none, forest.none],
    ]);
  } else {
    /* Default level */
    return new Level([
      [door.none, door.right, door.minecraft, door.none, door.goal, door.none],
      [door.none, door.sofa, door.outdoor, door.chessMate, door.both, door.chessStale],
      [door.none, door.yellowBoxes, PlayerStartsAt(door.black), door.green, door.banner, door.top],
      [door.none, door.highLow, door.new, door.wheel, door.plain, door.top],
      [door.none, door.top, door.cricketGround, door.treasure, door.top, door.top],
      [door.none, door.top, door.both, door.treasureKey, door.drawn, door.top],
      [NullTile, door.none, door.none, door.none, door.none, door.newYear],
    ]);
  }
}
