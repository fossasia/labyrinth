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
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [door.none, door.top, PlayerStartsAt(door.black), door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.drawn, door.top],
    [NullTile, door.none, door.none, door.none, door.none, door.none],
  ]);
}
