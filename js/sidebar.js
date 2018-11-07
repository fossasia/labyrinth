function openSideBar() {
	document.getElementById("slide-out").style.transform = "translateX(0%)";
	navburger.removeEventListener("click", openSideBar);
	navburger.addEventListener("click", closeSideBar);
}
function closeSideBar() {
	document.getElementById("slide-out").style.transform = "translateX(-100%)";
	navburger.removeEventListener("click", closeSideBar);
	navburger.addEventListener("click", openSideBar);
}
$(document).ready(function(){
	window.navburger = document.querySelector("nav .left li a");
	$.ajax({
    	url: "https://api.github.com/repos/fossasia/labyrinth/git/refs/heads/master"
	}).done(function(data) {
		var versionWriter = data.object.sha;
		$("#labyrinthVersion").append(versionWriter);
		$("#labyrinthVersion").attr("href", "https://github.com/fossasia/labyrinth/commit/"+data.object.sha);
	});

	var $z=$('.select-your-language>a');
	var $a=$('.languagepicker.roundborders.large');
	var $tab=$('.select-your-language');
	$a.hover(function(){
		$z.html('Select your language <span class="fa fa-caret-up"></span>');
		$tab.css({
			'background-color': '#80BE62',
		});
	},function(){
		$z.html('Select your language <span class="fa fa-caret-down"></span>');
		$tab.css({
			'background-color': '#60A550',
		});
	});
});

