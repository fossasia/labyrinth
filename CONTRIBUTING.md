# Contributions Best Practices

This document shall give you an overview of how you can contribute to the project.
It is split up in these parts:

- [Ways to go for your contribution][how-to-contribute]
- [General Practices to keep in mind when contributing][general-practices]

## How To Contribute
[how-to-contribute]: #how-to-contribute

This section includes a collection of ways to contribute.
The purpose of the different issue templates is to guide contributors and to allow synchronization with other developers.

### Report A Bug

Please see if the bug was reported before by searching the [issue tracker][issues] for some key words you would say.
In case it was, you can collaborate, leave a comment and get into discussion.

To report a bug, please open a new issue following [this issue template]().
A bug might be unexpected behavior or a clear violation of design principles.

### Request a Feature

Please see if the feature was reported before by searching the [issue tracker][issues] for some key words you would say.
In case it was, you can collaborate, leave a comment and get into discussion.

If you have a new idea about how to improve the game, please open [an issue for your feature request][issue-new-feature].

### Fix a Bug

If you like to help improve the game or a bug caught your eye and you like to fix it:

1. Please [visit the issue][issues-bug] and leave a comment that you like to work on it.
2. See if someone else opened a pull request. If so, you can choose to comment that [you like to cooperate][cooperate].
3. If there is no pull request by other people within a day, feel free to [create your own pull request][create-pr] within one day.

### Create a Pull Request
[create-pr]: #create-a-pull-request

If you [create a pull request][new-pr], you do not need to solve all problems at once.
We like little steps more because they are easier to understand.
Please follow the [pull request template][pr-template] or change it.

To inform other people about your work and to enable them to use our work,
consider to create pull requests as soon as possible, after the first small commit.

### Add a Dependency

To make the game more interesting, please add a place which can only be entered
if something else was done before,
e.g. a door with a key to find, a troll and a meal to prepare, a river and a boat to build, ... .

To do this, please open [a dependency issue][issue-add-a-dependency].
You will be guided from there.

### Add Self-Made Background Music

To make the game more interesting, please add background music.
Please follow the [issue template for adding background music][issue-add-background-music]
for doing so.

### Add New Ways to Contribute

You can add new of these entries to [this section][how-to-contribute].
Please evaluate your idea like this:
- If it can be done once and is completed, it is an issue, not a task.
- If it can be done endlessly and is done once, it is a task.
- If you mix both in a task, think about adding a task enablement issue.

Then, open a [new issue][issue-new-way-to-contribute].


### Cooperate on a Pull Request
[cooperate]: #cooperate-on-a-pull-request

You can cooperate on pull requests with other contributors.
You can use techniques like [pair programming](https://www.youtube.com/watch?v=vgkahOzFH2Q) or
collaborate together on branches of your forks.
You can attribute a pull-request also to other people who helped you out or submit a pull-request
where you and an other person contributed together.

You can comment on an existing [issue][issues] that you like to cooperate with specific people or
ask in the [chat] if anyone would be interested in cooperating.

### Add Sound to Tiles

When you enter a tile, the game can play sounds.
Please follow the [issue template for tile music][issue-add-tile-sound] to add music to certain tiles on entering.
Consider that the music should be your own.

### Create a Tile

You can add small parts of the labyrinth for people to walk through it.
Please open an issue if you like to [create a tile][issue-add-tile] to help us help you customize the game.

### Create a Hand-Drawn Tile

The labyrinth not only contains computer-generated tiles but also tiles draw by hand.
Please open an issue if you like to [create a hand-drawn tile][issue-add-hand-drawn-tile] to track the progress.

### Create a New Level

Although you see only one level, you can reach the goal tile of this and other levels to switch between the levels.
You can add new levels to the labyrinth.
Please open an [issue for adding a new level][issue-add-level] which will guide you through the process.




[pr-template]:                  .github/PULL_REQUEST_TEMPLATE.md
[new-pr]:                       https://github.com/fossasia/labyrinth/pulls/new
[issues]:                       https://github.com/fossasia/labyrinth/issues
[issues-bug]:                   https://github.com/fossasia/labyrinth/issues?q=is%3Aissue+is%3Aopen+label%3Abug
[issue-new-feature]:            https://github.com/fossasia/labyrinth/issues/new?template=request-a-feature.md&labels=new+featuretitle=Add+a+new+feature:+fill+in+the+title+here
[issue-new-bug]:                https://github.com/fossasia/labyrinth/issues/new?template=report-a-bug.md&labels=bug&title=Found+bug:+fill+in+the+title+here
[issue-add-a-dependency]:       https://github.com/fossasia/labyrinth/issues/new?template=add-a-dependency.md&title=New+Dependency:+fill+in+the+title+here
[issue-add-background-music]:   https://github.com/fossasia/labyrinth/issues/new?template=add-background-music.md&title=New+Background+Music:+fill+in+the+title+here
[issue-new-way-to-contribute]:  https://github.com/fossasia/labyrinth/issues/new?template=new-way-to-contribute.md&title=New+Background+Music:+fill+in+the+title+here
[chat]:                         https://gitter.im/fossasia/labyrinth
[issue-add-tile-sound]:         https://github.com/fossasia/labyrinth/issues/new?template=add-tile-sound.md&title=New+Tile+Sound:+fill+in+the+title+here
[issue-add-hand-drawn-tile]:    https://github.com/fossasia/labyrinth/issues/new?template=add-tile.md&title=New+Hand-Drawn+Tile:+fill+in+the+title+here
[issue-add-tile]:    https://github.com/fossasia/labyrinth/issues/new?template=add-tile.md&title=New+Tile:+fill+in+the+title+here
[issue-add-level]:    https://github.com/fossasia/labyrinth/issues/new?template=add-level.md&title=New+Level:+fill+in+the+title+here


## General Contribution Practices
[general-practices]: #general-contribution-practices

### Commits
* Write clear meaningful git commit messages (Do read http://chris.beams.io/posts/git-commit/)
* Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests )
* When you make very very minor changes to a PR of yours (like for example fixing a failing travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterwards so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at https://davidwalsh.name/squash-commits-git )
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.
* Tip for deployment - You can create the deployment link for the Labyrinth app to check how your commited changes look, you can view the deployed site on this link: http://rawgit.com/YOUR_USERNAME/labyrinth/master/index.html

### Code Style Recommendations
* In HTML files, there should be no spaces before the html, head and body tags. All the nested tags of HTML have to be indented with 2 spaces. Same goes for CSS and JavaScript. Please follow this in order to keep the indentation style consistent.
* Please try to avoid obvious comments. Commenting should be done only when it's necessary.
* Follow the DRY(Don't Repeat Yourself) principle. The same piece of code should not be repeated over and over again.

### Feature Requests and Bug Reports
* When you file a feature request or when you are submitting a bug report to the [issue tracker][issues], make sure you add steps to reproduce it. Especially if that bug is some weird/rare one.
* Please have a look if someone else suggested something similar and see it a new issue is necessary.
* Please follow the issue template as it focusses on the motivation and how life and the game is improved. This can not be reflected by code as well. 

### Join the development
* Before you join development, please set up the project on your local machine, run it and go through the application completely. Press on any button you can find and see where it leads to. Explore. (Don't worry ... Nothing will happen to the app or to you due to the exploring :wink: Only thing that will happen is, you'll be more familiar with what is where and might even get some cool ideas on how to improve various aspects of the app.)
* If you would like to work on an issue, drop in a comment at the issue. If it is already assigned to someone, but there is no sign of any work being done, please free to drop in a comment so that the issue can be assigned to you if the previous assignee has dropped it entirely.

Do read the [Open Source Developer Guide and Best Practices at FOSSASIA](https://blog.fossasia.org/open-source-developer-guide-and-best-practices-at-fossasia).

### Hosting Assets
Usage of CDNs and other online hosts for assets used in the Labyrinth is not recommended. 
We want users to be able to play the game without an active internet connection. CDNs slow down the page by collecting analytics data. And who wants bots monitoring what you do? 

Make sure you keep them in their respective folders in the Github Repository.

### Licensing Code
We recommend you add code and work which you did yourself. By adding this code to the repository, you put it under the [AGPL license](LICENSE).  
If you embed other work, you need to be compatible with the current license. Licenses compatible are e.g. MIT, GPL, AGPL, LGPL, BSD. **In almost no case is it legal to just copy the code/files without license.**
- [Embedding MIT](https://opensource.stackexchange.com/questions/6342/where-to-put-license-for-mit-licensed-code-on-website): You need to keep the license close to the code:
  - CSS/HTML/Javascript: embed it into the code, it is not that long
  - binary files e.g. fonts: create a file with the same name next to the binary file with `.license` in the end and copy the license in there.
- Stackoverflow: Link to the answer or question.
- ... append in the future.
