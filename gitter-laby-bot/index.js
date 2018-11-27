
var exec = require("child-process-promise").exec;

module.exports = app => {
  // Your code here
  app.log("Labyrinth Gitter bot");

  app.on("issues.opened", async context => {
    const issueComment = context.issue({ body: 'Thanks for opening this issue! I hope you have used the issue templates given here https://github.com/fossasia/labyrinth/tree/master/.github' });
    exec(`curl -d '{"text":"A new Issue was opened"}' -H "Accept: application/json" -H "Content-Type: application/json" -X POST https://api.gitter.im/v1/rooms/5a1c445bd73408ce4f8080b3/chatMessages?access_token=$access_token`)
    .then(function (result) {
      var stdout = result.stdout;
      var stderr = result.stderr;
      console.log("stdout: ", stdout);
      console.log("stderr: ",stderr);
  });
  return context.github.issues.createComment(issueComment);
  });
  app.on("pull_request.opened", async context => {
    const issueComment = context.issue({ body: 'Thanks for opening making a PR. I hope you have read the guidelines at https://blog.fossasia.org/open-source-developer-guide-and-best-practices-at-fossasia/' });
    
    exec(`curl -d '{"text":"A new PR was opened"}' -H "Accept: application/json" -H "Content-Type: application/json" -X POST https://api.gitter.im/v1/rooms/5a1c445bd73408ce4f8080b3/chatMessages?access_token=$access_token`)
    .then(function (result) {
      var stdout = result.stdout;
      var stderr = result.stderr;
      console.log("stdout: ", stdout);
      console.log("stderr: ", stderr);
  });
    return context.github.issues.createComment(issueComment)
  });
}
