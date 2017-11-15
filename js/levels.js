function createTestLevel()
{
  return new Level([
    [wall.right, door.right, door.right, door.right, door.right, door.none],
    [wall.right, door.top, door.both, door.both, door.both, door.top],
    [wall.right, door.top, PlayerStartsAt(door.both), door.both, door.both, door.top],
    [wall.right, door.top, door.both, door.both, door.both, door.top],
    [wall.right, door.top, door.both, door.both, door.both, door.top],
    [wall.right, door.top, door.both, door.both, door.both, door.top],
    [NullTile, wall.top, wall.top, wall.top, wall.top, wall.top],
  ]);
}
