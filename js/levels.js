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
      [door.none, door.right, door.minecraft, door.none, door.goal, door.none],
      [door.none, door.right, door.Forbidden, door.none, door.none, door.none],
      [door.none, door.sofa, door.outdoor, door.chessMate, door.both, door.chessStale],
      [door.none, door.yellowBoxes, PlayerStartsAt(door.black), door.green, door.banner, door.top],
      [door.none, door.highLow, door.new, door.wheel, door.plain, door.top],
      [door.none, door.top, door.cricketGround, door.treasure, door.yellow, door.top],
      [door.none, door.top, door.marina, door.treasureKey, door.drawn, door.top],
      [NullTile, door.none, door.none, door.none, door.none, door.newYear],
    ]);
  } else if (level == 3){
    return new Level([
      [desert.none, desert.right, desert.right, desert.right, desert.right, desert.none],
      [desert.none, desert.top, desert.both, desert.both, desert.both, desert.both],
      [desert.none, desert.top, PlayerStartsAt(desert.start), desert.both, desert.both, desert.top],
      [desert.none, desert.top, desert.both, desert.both, desert.both, desert.top],
      [desert.none, desert.top, desert.top, desert.both, desert.top, desert.top],
      [desert.none, desert.top, desert.both, desert.both, desert.both, desert.top],
      [NullTile, desert.none, desert.none, desert.none, desert.none, desert.none],
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
