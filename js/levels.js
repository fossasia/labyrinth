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
    [door.none, door.right, door.minecraft, door.none, door.goal, door.none],
    [door.none, door.sofa, door.outdoor, door.chessMate, door.both, door.chessStale],
    [door.none, door.yellowBoxes, PlayerStartsAt(door.black), door.green, door.banner, door.top],
    [door.none, door.highLow, door.new, door.wheel, door.plain, door.top],
    [door.none, door.top, door.cricketGround, door.treasure, door.top, door.top],
    [door.none, door.top, door.both, door.treasureKey, door.drawn, door.top],
    [NullTile, door.none, door.none, door.none, door.none, door.newYear],
  ]);

  return new Level([
    [NullTile, door.none, door.left, door.right, door.none, door.right, door.none, door.none, door.right, door.top],
    [door.none, door.right, door.right, door.right, door.goal, door.none, door.top, door.left, door.right,],
    [door.none, door.top, door.both, door.both, door.wheel, door.top, NullTile, door.right, door.top, door.left],
    [door.none, door.top, PlayerStartsAt(door.black), door.both, door.both, door.top]
    [door.none, door.top, door.both, door.both, door.both, door.top, door.top, door.left, door.right],
    [door.none, door.top, door.wheel, door.both, door.both, door.wheel, door.right, door.top, door.top],
    [door.none, door.top, door.both, door.wheel, door.both, door.top, door.none, door.right, door.top, door.both],
    [door.none, door.none, door.none, door.none, door.none, door.none, door.both, door.right, door.top, door.none],
    [door.left, door.top, door.none, door.right, door.none, door.wheel, door.none, door.none, door.none],
    [NullTile, door.none, door.none, door.none, door.none, door.none, door.left, door.top, door.right, door.top]
]);
  /* I know this return doesnot work but leaving it here to be solved in #161 */
  /* Forest specific levels */
  return new Level([
    [forest.none, forest.right, forest.right, forest.right, forest.right, forest.none],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.both],
    [forest.none, forest.top, PlayerStartsAt(forest.start), forest.both, forest.both, forest.top],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
    [forest.none, forest.top, forest.top, forest.both, forest.top, forest.top],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
    [NullTile, forest.none, forest.none, forest.none, forest.none, forest.none],
  ]);
}
