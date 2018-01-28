$(document).ready(function(){
  $('.select-your-lang').hover(function(){ 
    $('.dropdown-toggle', this).trigger('click'); 
  });
  $('#monitor').html($(window).width());
  $(window).resize(function() {
    var viewportWidth = $(window).width();
    $('#monitor').html(viewportWidth);
  });
}
);