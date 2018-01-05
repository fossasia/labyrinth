/*
INVENTORY MECHANISM
by
/ yashkumarverma
http://github.com/yashkumarverma/
*/

function inventory() {
    // Number of Items
    this.items = [];
    this.inventoryId = 0;
    this.itemCollision = [];

    // Link Images
    var imageDirectory = "images/game/inventory/";

    // add item to inventory
    // Pass array comprising of 2 values. First name, second image
    // player.add(['key','key.jpg'])
    this.add = function (object) {
        /* OBJECT Details
        0 has inventory id
        1 has item name
        2 has item image */
        var itemStr = {
            id: this.inventoryId++,
            name: object[0],
            image: object[1]
        };

        // Allow only one item of one name
        // Collision
        if (collisionCheck(itemStr, this.itemCollision)) {
            this.items.push(itemStr);
            this.itemCollision.push(itemStr.name);
            addItem(itemStr);
        }
    };

    // check if item exist in inventory
    this.has = function (object) {
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].name === object) {
                return true;
            } else {
                return false;
            }
        }
    };

    // to remove / consume item
    this.remove = function (itemName) {
        var id = 0;
        for (var i = this.items.length - 1; i >= 0; i--) {
            if (this.items[i].name == itemName) {
                $("#inventoryItem_" + this.items[i].id).remove();
            }
        }
    }

    // printInventoryItem
    function addItem(obj) {
        var data = "<li id='inventoryItem_" + obj.id + "' class='collection-item avatar'>" +
            "<img src='" + imageDirectory + obj.image + "' alt='" + obj.name + "' class='circle'>" +
            "<b><span class='title'>" + obj.name + "</span></b>" +
            "</li>";
        $("#inventoryDisplay").append(data);
    }

    function collisionCheck(itemName, dataset) {
        if (dataset.length == 0)
            return true;

        if ($.inArray(itemName, dataset) == -1)
            return true;
        else
            return false;
    }
}
