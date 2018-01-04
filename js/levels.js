// defined in /js/tiles.js
/* global NullTile */
/* global door */
/* global PlayerStartsAt */

// defined in /js/level.js
/* global Level */

// createTestLevel is used in /js/gui.js ignoring the error
// ignore JSHintBear
function createTestLevel()
{
  return new Level([
    [door.none, door.right, door.right, door.right, door.goal, door.none],
    [door.none, door.sofa, door.outdoor, door.chessMate, door.both, door.chessStale],
    [door.none, door.top, PlayerStartsAt(door.black), door.green, door.banner, door.top],
    [door.none, door.top, door.new, door.wheel, door.plain, door.top],
    [door.none, door.top, door.top, door.treasure, door.top, door.top],
    [door.none, door.top, door.both, door.treasureKey, door.drawn, door.top],
    [NullTile, door.none, door.none, door.none, door.none, door.newYear],
  ]);
  /*return new Level([
    [PlayerStartsAt(door.chessMate),door.chessStale]
]);*/
}
