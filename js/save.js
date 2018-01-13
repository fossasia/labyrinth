/*  save.js
 * 
 *  This file lists down the functions used for save and load feature.
 *  The triggers are defined in gui.js
 */
var saveObjectName = "labyrinthSaveObject";

function gameState () {
    this.badges = new badges();
    this.inventory = new inventory();
}

function saveExists() {
    if (localStorage.getItem(saveObjectName) == null) {
        return 0;
    } else {
        return 1;
    }
}

function saveGameState(saveObject) {
    localStorage.setItem(saveObjectName, JSON.stringify(saveObject));
    alert(JSON.stringify(saveObject));
}

function getSaveGame() {
    var savedObjectJSONString = localStorage.getItem(saveObjectName);
    var savedObject = JSON.parse(savedObjectJSONString);
    return savedObject;
}

function saveGame(player) {
    var state = new gameState();
    state.badges = player.badges.items;
    state.inventory = player.inventory.items;
    saveGameState(state);
}

function loadGame(player) {
    if(saveExists() == 1) {
        var state = getSaveGame();
        for(var i = 0; i < state.badges.length; i++) {
            player.badges.add([state.badges[i].name, state.badges[i].image]);
        }
        for(var j = 0; j < state.inventory.length; j++) {
            player.inventory.add([state.inventory[j].name, state.inventory[j].image]);
        }
    } else {
        alertInfo("No save state found", "Either the last save state was not found or there was no save made. Sorry about that.");
    }
}
