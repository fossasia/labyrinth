function httpGetAsync(theUrl, callback)
{
  // from https://stackoverflow.com/a/4033310/1320237
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4) {
      if (xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      } else {
        console.log("httpGetAsync: " + theUrl + " " + xmlHttp.status);
      }
    }
  };
  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}
