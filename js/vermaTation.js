/*
 * VermaTation v0.0.1 (https://github.com/YashKumarVerma/VermaTation)
 * Copyright 2018 YashKumarVerma
 * MIT License (https://github.com/YashKumarVerma/VermaTation/blob/master/LICENSE)
*/
$(document).ready(function(){
	// load data
	$.get("../documentation/data.json", function(data){
		$.each(data.vermaTation,function(node,value){
			insertToList(value);
			createCard(value);
			console.log("loaded");
		});
		console.log(data);
	});
});

function insertToList(node){
	var data = "<a href='#"+node.slug+"' class='collection-item'>"+node.itemName+"</a>";
	$("#documentationList").append(data);
}

function createCard(node){
	$.get("../documentation/storage/"+node.file,function(documentationData){
		
		var data = "<div class='row' id='"+node.slug+"'> <div class='col s12 m12'> <div class='card blue-grey darken-1'>"+
		"<div class='card-content white-text'> <span class='card-title'>"+node.itemName+"</span><p>"+
		documentationData+"</p></div><div class='card-action'>Contributed by <a href='https://github.com/"+node.github+
		"'>"+node.author+"</a></div></div></div></div>";

		$("#documentationContent").append(data);
	});
}
