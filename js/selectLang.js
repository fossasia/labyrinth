
window.onload=function(){
if (localStorage.getItem('lang') == undefined) {
    $('#select-language').show();
}else{
    $('#select-language').hide();
    $('.overlay').css({"display":'none'});		
}
};