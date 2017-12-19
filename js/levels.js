function createTestLevel()
{
  return new Level([
    [door.none, door.right, door.right, door.right, door.right, door.none],
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [door.none, door.top, PlayerStartsAt(door.both), door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.both, door.top],
    [NullTile, door.none, door.none, door.none, door.none, door.none],
  ]);
}
