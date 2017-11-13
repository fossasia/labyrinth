
var testLevel = [
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
  ["door/left-right", "door/left", "door/right", "door/left-right", "door/left-right"],
];

const scale = 0.5;
const tileWidth = 429.544 * scale; // px, real width
const tileHeight = 256.314 * scale; // px

function indexToPosition(x, y)
{
  return {
    "x": tileWidth * (x + y),
    "y": tileHeight * (-x + y)
  }
}

window.addEventListener("load", function()
{
  loadLevel(testLevel, document.getElementById("tiles"));
});

function loadLevel(level, container)
{
  for (var y = 0; y < level.length; y += 1)
  {
    var row = level[y];
    for (var x = 0; x < row.length; x += 1)
    {
      var tile = row[x];
      const file = "tiles/" + tile + ".svg";
      var embed = document.createElement("embed");
      embed.id = "tile-" + x + "-" + y;
      embed.src = file;
      embed.type = "image/svg+xml";
      embed.classList.add("tile");
      embed.style.width = tileWidth; // this scales down everything
      var position = indexToPosition(x, y);
      embed.style.left = position.x + "px";
      embed.style.top = position.y + "px";
      embed.style.zIndex = -x + y;
      container.appendChild(embed);
    }
  }
}
