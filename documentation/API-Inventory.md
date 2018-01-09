Inventory Mechanism
-------------------

* * *

The inventory mechanism allows user to pick up objects or items from the game by passing over them. The API at present provides three functions for interaction with the mechanism.

The engine by default doesn't allow multiple instances of the same item to be added to inventory.

* * *

### inventory.add()

This function is used to add an item to the player's inventory. The function accepts an array as parameters, the first index containing the item's name and second containing the object's image.  
For instance, the following code snippet adds a bucket to the inventory.

    
      Player.inventory.add(["bucket","bucket.jpg"]);
      Player.inventory.add(["skull","skull.jpg"]);
    

* * *

### inventory.has()

This function is used to check the existence of an item in the player's inventory. The function accepts a string as parameter, which is the item's name.  
For instance, the following code snippet returns true if key found.

    
    if(Player.inventory.has("bucket")){
      // dance about in the maze
    }
    

* * *

### inventory.remove()

This function is used to remove an item from the player's inventory. The function accepts a string as parameter, which is the item's name.  

    
    if(Player.inventory.has("coin")){
      ThrowParty();
      Player.inventory.remove(coin);
    }

---
[Yash Kumar Verma](https://github.com/yashkumarverma)

