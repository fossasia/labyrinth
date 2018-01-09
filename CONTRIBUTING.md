## Contributions Best Practices

### Commits
* Write clear meaningful git commit messages (Do read http://chris.beams.io/posts/git-commit/)
* Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (More info at https://github.com/blog/1506-closing-issues-via-pull-requests )
* When you make very very minor changes to a PR of yours (like for example fixing a failing travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterwards so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at https://davidwalsh.name/squash-commits-git )
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.
* Tip for deployment - You can create the deployment link for the Labyrinth app to check how your commited changes look, you can view the deployed site on this link: http://rawgit.com/YOUR_USERNAME/labyrinth/master/index.html

### Feature Requests and Bug Reports
* When you file a feature request or when you are submitting a bug report to the [issue tracker](https://github.com/fossasia/labyrinth/issues), make sure you add steps to reproduce it. Especially if that bug is some weird/rare one.
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
- Embedding MIT: You need to keep the license close to the code:
  - CSS/HTML/Javascript: embed it into the code, it is not that long
  - binary files e.g. fonts: create a file with the same name next to the binary file with `.license` in the end and copy the license in there.
- Stackoverflow: Link to the answer or question.
- ... append in the future.
