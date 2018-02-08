function badges() {

    this.items = [];
    this.badgesId = 0;
    this.itemCollision = [];

    var imageDirectory = "images/game/badges/";

    this.add = function(object) {
        var itemStr = {
            id: this.badgesId++,
            name: object[0],
            image: object[1]
        };

        // Allow only one item of one name
        if (collisionCheck(itemStr.name, this.itemCollision)) {
            this.items.push(itemStr);
            this.itemCollision.push(itemStr.name);
            addItem(itemStr);
        }
    };

    function addItem(obj) {
        var data = "<li id='badgesItem_" + obj.id + "' class='collection-badges'>" +
            "<img src='" + imageDirectory + obj.image + "' alt='" + obj.name + "' title='" + obj.name + "' class='badgesImg'>" +
            "</li>";
            $("#badgesDisplay").append(data);
            $("#badge_count").html("(" + count() + "/4)");
    }


    function count() {
        if( typeof count.counter == 'undefined' ) {
            count.counter = 0;
        }
        return ++(count.counter);
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
