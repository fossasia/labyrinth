+// defined in /js/tiles.js
 +/* global NullTile */
 +/* global door */
 +/* global PlayerStartsAt */
 +
 +// defined in /js/level.js
 +/* global Level */
 +
 +// createTestLevel is used in /js/gui.js ignoring the error
 +// ignore JSHintBear
 +function createTestLevel()
 +{
 +  return new Level([
 +    [door.none, door.right, door.right, door.right, door.right, door.new],
 +    [door.none, door.top, door.both, door.both, door.both, door.both],
 +    [door.none, door.new, PlayerStartsAt(door.start), door.both, door.both, door.top],
 +    [door.none, door.top, door.both, door.both, door.both, door.top],
 +    [door.none, door.top, door.top, door.both, door.top, door.new],
 +    [door.none, door.top, door.both, door.new, door.both, door.goal],
 +    [NullTile, door.none, door.none, door.none, door.none, door.none],
 +  ]);
 +  /*return new Level([
 +    [PlayerStartsAt(door.chessMate),door.chessStale]
 +]);*/
 +}
