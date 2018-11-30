// defined in /js/tiles.js
/* global NullTile */
/* global door */
/* global PlayerStartsAt */

// defined in /js/level.js
/* global Level */

// createTestLevel is used in /js/gui.js ignoring the error
// ignore JSHintBear
function createFirstLevel()
{
  return new Level("Starter", [

    [door.navypink, door.blood, door.staani, door.treasureKey, door.starywall, door.night],
    [door.drawnPond, door.minecraftEntry, door.minecraft, door.orange, door.winter1, door.goal, door.none],
    [door.navypink, door.blood, door.marina, door.treasureKey, door.drawnbyhand, door.night],

    [door.dark1, door.minecraftEntry, door.minecraft, door.orange, door.reddish, door.winter1, door.goal, door.none],
    [door.drawnbysahil, door.orchestra, door.Forbidden, door.chocolate, door.guitarCase, door.winter2],

    [door.dark1, door.minecraftEntry, door.minecraft, door.orange, door.rollingball, door.reddish, door.winter1, door.goal, door.none],
    [door.newlines, door.orchestra, door.Forbidden, door.chocolate, door.guitarCase, door.winter2],

    [door.sea, door.sofa, door.outdoor, door.chessMate, door.texture, door.chessStale],
    [door.drawnbyme, Superhero.art, PlayerStartsAt(door.black), door.green, door.banner, door.threeHeads],
    [door.fairysWheel, door.design, door.cricketGround, door.treasure, door.yellow, door.red],
    [door.both, door.blood, door.marina, door.treasureKey, door.drawn, door.night],
    [door.handy, door.boat, door.river, desert.universe, door.cake, door.newYear],
    [door.both, door.square, door.quake, desert.universe, door.cake, door.mountains],
    [door.both, door.boat, door.river, desert.universe, door.cake, door.mountains],  
  ]);
}

function createAdvancedLevel() {
  return new Level("Advanced", [
    [NullTile, door.none, door.left, door.right, door.none, door.right, door.none, door.none, door.right, door.top],
    [door.none, door.right, door.right, door.right, door.goal, door.none, door.top, door.left, door.right,],
    [door.drawnbyme, door.top, door.both, door.both, door.wheel, door.top, NullTile, door.right, door.top, door.left],
    [door.none, door.top, PlayerStartsAt(door.black), door.both, door.both, door.top],
    [door.none, door.top, door.both, door.both, door.both, door.top, door.top, door.left, door.right],
    [door.none, door.top, door.wheel, door.both, door.both, door.wheel, door.right, door.top, door.top],
    [door.none, door.top, door.both, door.wheel, door.both, door.top, door.none, door.right, door.top, door.both],
    [door.none, door.none, door.none, door.none, door.none, door.none, door.both, door.right, door.top, door.none],
    [door.left, door.top, door.none, door.right, door.none, door.wheel, door.none, door.none, door.none],
    [NullTile, door.none, door.none, door.none, door.none, door.none, door.left, door.top, door.right, door.top],
  ]);
}

function createForestLevel() {
  return new Level("Forest", [
    [forest.none, forest.right, forest.CreativeRoomDoor, forest.right, forest.right, forest.right, forest.none],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
    [forest.none, forest.top, PlayerStartsAt(forest.start), forest.both, forest.both, forest.top],
    [forest.none, forest.top, forest.mushroom, forest.both, forest.both, forest.top],
    [forest.none, forest.top, forest.top, forest.both, forest.top, forest.top],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
    [NullTile, forest.none, forest.none, forest.none, forest.none, forest.none],
  ]);
}
function createSpaceLevel() {
  return new Level("Space", [
    [space.none, space.right, space.right, space.right, space.right, space.none],
    [space.none, space.top, space.both, space.both, space.both, space.both],
    [space.none, space.top, PlayerStartsAt(space.start), space.both, space.both, space.top],
    [space.none, space.top, space.both, space.both, space.both, space.top],
    [space.none, space.top, space.top, space.both, space.top, space.top],
    [space.none, space.top, space.both, space.both, space.both, space.top],
    [NullTile, space.none, space.none, space.none, space.none, space.none],
  ]);
}

function createCrazyLevel() {
  return new Level("Crazy", [
    [crazy.none, crazy.right, crazy.right, crazy.right, crazy.right, crazy.right, crazy.top],
    [crazy.none, crazy.top, crazy.both, crazy.both, crazy.both, crazy.top, crazy.top],
    [crazy.none, crazy.top, PlayerStartsAt(crazy.start), crazy.both, crazy.top, crazy.top, crazy.top],
    [crazy.none, crazy.top, crazy.both, crazy.both, crazy.both, crazy.top, crazy.top],
    [crazy.none, crazy.top, crazy.top, crazy.both, crazy.top, crazy.top, crazy.top],
    [crazy.none, crazy.top, crazy.both, crazy.both, crazy.right, crazy.top, crazy.top],
    [NullTile, crazy.none, crazy.none, crazy.none, crazy.none, crazy.none, crazy.none],
  ]);
}
function createDesertLevel() {
  return new Level("Desert", [
    [desert.none, desert.right, desert.right, desert.right, desert.right, desert.none],
    [desert.drawnbyme, desert.top, desert.both, desert.both, desert.both, desert.both],
    [desert.none, desert.top, PlayerStartsAt(desert.start), desert.both, desert.both, desert.top],
    [desert.none, desert.top, desert.both, desert.both, desert.both, desert.top],
    [desert.none, desert.top, desert.top, desert.both, desert.top, desert.top],
    [desert.none, desert.top, desert.both, desert.both, desert.both, desert.top],
    [NullTile, desert.none, desert.none, desert.none, desert.none, desert.none],
  ]);
}
function createPartyLevel() {
  return new Level("Party", [
    [party.none, party.right, party.right, party.right, party.right, party.none],
    [party.none, party.top, party.both, party.both, party.both, party.both],
    [party.none, party.top, PlayerStartsAt(party.start), party.both, party.both, party.top],
    [party.none, party.top, party.both, party.both, party.both, party.top],
    [party.none, party.top, party.top, party.both, party.top, party.top],
    [party.none, party.top, party.both, party.both, party.both, party.top],
    [NullTile, party.none, party.none, party.none, party.none, party.none],
  ]);
}
function createSuperheroLevel() {
  return new Level("Super Hero", [
    [Superhero.none, Superhero.right, Superhero.right, Superhero.second, Superhero.right, Superhero.none],
    [Superhero.drawnbyme, Superhero.first, Superhero.both, Superhero.second, Superhero.both, Superhero.second],
    [Superhero.none, Superhero.first, PlayerStartsAt(Superhero.start), Superhero.both, Superhero.both, Superhero.top],
    [Superhero.none, Superhero.second, Superhero.both, Superhero.second, Superhero.both, Superhero.second],
    [Superhero.none, Superhero.first, Superhero.top, Superhero.second, Superhero.top, Superhero.top],
    [Superhero.none, Superhero.first, Superhero.second, Superhero.both, Superhero.both, Superhero.top],
    [NullTile, Superhero.none, Superhero.none, Superhero.none, Superhero.none, Superhero.none],
  ]);
}
function createPartytimeLevel() {
  return new Level("Partytime", [
    [partytime.none, partytime.right, partytime.right, partytime.right, partytime.right, partytime.right, partytime.top],
    [partytime.none, partytime.top, partytime.both, partytime.both, partytime.both, partytime.top, partytime.top],
    [partytime.none, partytime.top, PlayerStartsAt(partytime.start), partytime.both, partytime.top, partytime.top, partytime.top],
    [partytime.none, partytime.top, partytime.both, partytime.both, partytime.both, partytime.top, partytime.top],
    [partytime.none, partytime.top, partytime.top, partytime.both, partytime.top, partytime.top, partytime.top],
    [partytime.none, partytime.top, partytime.both, partytime.both, partytime.right, partytime.top, partytime.top],
    [NullTile, partytime.none, partytime.none, partytime.none, partytime.none, partytime.none, partytime.none],
  ]);
}
function createGraphicsManiaLevel() {
  return new Level("Grpahics Mania", [
    [graphics.none, graphics.right, graphics.right, graphics.right, graphics.right, graphics.none, graphics.none],
    [graphics.none, graphics.top, graphics.both, graphics.both, graphics.both, graphics.top, graphics.none],
    [graphics.none, graphics.top, PlayerStartsAt(graphics.both), graphics.both, graphics.both, graphics.top, graphics.none],
    [graphics.none, graphics.top, graphics.both, graphics.both, graphics.both, graphics.top, graphics.top],
    [graphics.none, graphics.top, graphics.both, graphics.both, graphics.both, graphics.top, graphics.top],
    [graphics.none, graphics.top, graphics.both, graphics.both, graphics.both, graphics.top, graphics.top],
    [NullTile, graphics.none, graphics.none, graphics.none, graphics.none, graphics.none, graphics.none],
  ]);
}
function createTileMeshLevel() {
  return new Level([
    [TileMesh.none, TileMesh.right, TileMesh.right, TileMesh.right, TileMesh.right, TileMesh.none],
    [TileMesh.none, TileMesh.top, TileMesh.both, TileMesh.both, TileMesh.both, TileMesh.both],
    [TileMesh.none, TileMesh.top, PlayerStartsAt(TileMesh.start), TileMesh.both, TileMesh.both, TileMesh.top],
    [TileMesh.none, TileMesh.top, TileMesh.both, TileMesh.both, TileMesh.both, TileMesh.top],
    [TileMesh.none, TileMesh.top, TileMesh.top, TileMesh.both, TileMesh.top, TileMesh.top],
    [TileMesh.none, TileMesh.top, TileMesh.both, TileMesh.both, TileMesh.both, TileMesh.top],
    [NullTile, TileMesh.none, TileMesh.none, TileMesh.none, TileMesh.none, TileMesh.none],
  ]);
}
function createNightLevel() {
  return new Level("Grpahics Mania", [
    [night.none, night.top, night.top, night.top, night.top, night.none],
    [night.none, night.top, night.top, night.top, night.top, night.none],
    [night.none, night.top, night.top, night.top, night.top, night.none],
    [night.none, night.top, night.top, night.top, night.top, night.none],
    [night.none, night.top, night.top, night.top, night.top, night.none],
    [night.none, night.top, PlayerStartsAt(night.start), night.top, night.top, night.none],
    [night.none, night.none, night.none, night.none, night.none, night.none],
  ]);
}
function createDarkLevel() {
  return new Level("Dark Realm", [
    [dark.none, dark.none, dark.top, dark.none, dark.none, dark.none, dark.light],
    [dark.none, dark.right, dark.cross, dark.right, dark.right, dark.right, dark.cross],
    [dark.none, dark.none, dark.top, dark.none, dark.top, dark.none, dark.top],
    [dark.none, dark.none, dark.top, dark.right, dark.cross, dark.end, dark.top],
	  [dark.none, dark.none, dark.top, dark.none, dark.top, dark.none, dark.top],
    [dark.none, dark.none, PlayerStartsAt(dark.start), dark.none, dark.top, dark.none, dark.top],
    [dark.none, dark.none, dark.none, dark.none, dark.cross, dark.right, dark.cross],
  ]);
}

