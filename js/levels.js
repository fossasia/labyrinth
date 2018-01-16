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
    [door.none, door.minecraftEntry, door.minecraft, door.blue, door.winter1, door.goal, door.none],
    [door.none, door.orchestra, door.Forbidden, door.chocolate, door.guitarCase, door.winter2],
    [door.none, door.sofa, door.outdoor, door.chessMate, door.texture, door.chessStale],
    [door.drawnbyme, Superhero.art, PlayerStartsAt(door.black), door.green, door.banner, door.threeHeads],
    [door.both, door.highLow, door.new, door.wheel, door.plain, door.top],
    [door.fairysWheel, door.design, door.cricketGround, door.treasure, door.yellow, door.red],
    [door.both, door.top, door.marina, door.treasureKey, door.drawn, door.top],
    [door.both, door.boat, door.river, desert.universe, door.cake, door.newYear],
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
    [forest.none, forest.right, forest.right, forest.right, forest.right, forest.none],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
    [forest.none, forest.top, PlayerStartsAt(forest.start), forest.both, forest.both, forest.top],
    [forest.none, forest.top, forest.mushroom, forest.both, forest.both, forest.top],
    [forest.none, forest.top, forest.top, forest.both, forest.top, forest.top],
    [forest.none, forest.top, forest.both, forest.both, forest.both, forest.top],
    [NullTile, forest.none, forest.none, forest.none, forest.none, forest.none],
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
