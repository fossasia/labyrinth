window.onload = function(){
  $.ajax({
    url: "https://api.github.com/repos/fossasia/labyrinth/contributors"
  }).done(function(data){
    data.forEach(function(contributors){
      var html = '<div class="column"><div class="card">';
      html += '<div class="contributorsImage">';
      html += '<img src="https://github.com/'+contributors.login+'.png?size=300x300" style="width:100%">';
      html += '</div>';
      html += '<br>';
      html += '<div class="lol"><p>'+contributors.login+' ('+contributors.contributions;
      if (contributors.contributions === 1) {
        html += ' contribution)</p>';
      } else {
        html += ' contributions)</p>';
      }
      html += '<p class="middle"><button class="button"> ';
      html += '<a href="'+contributors.html_url+'""> View on Github';
      html += '</button></p>';
      html += '</a></div></div></div>';
      $("#contributors").append(html);
    });
  });
};
// js for responsive navbar
$(document).ready(function(){
  var $id=$('#select-lang');
  var $a=$('#dropdownMenu');
  $a.css('color','white');
  

  $('.select-your-lang').hover(function(){ 
  $('.dropdown-toggle', this).trigger('click'); 
  });

  $id.hover(function(){
    $a.html('Select your language <span class="fa fa-caret-up"></span>');
    $a.css('background-color','#80BE62');
  },function(){
    $a.css('background-color','#60A550');
    $a.html('Select your language <span class="fa fa-caret-down"></span>');
  });
}
);
$('#monitor').html($(window).width());

  $(window).resize(function() {
  var viewportWidth = $(window).width();
$('#monitor').html(viewportWidth);
});



