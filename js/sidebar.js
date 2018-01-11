function openSideBar() {
	document.getElementById("slide-out").style.transform = "translateX(0%)";
}
function closeSideBar() {
	document.getElementById("slide-out").style.transform = "translateX(-100%)";
}
$(document).ready(function(){
	$.ajax({
    	url: "https://api.github.com/repos/fossasia/labyrinth/git/refs/heads/master"
	}).done(function(data) {
		var versionWriter = data.object.sha;
		$("#labyrinthVersion").append(versionWriter);
		$("#labyrinthVersion").attr("href", "https://github.com/fossasia/labyrinth/commit/"+data.object.sha);
	});
});