function onSignIn(googleUser)
{ console.log('hey')
    var profile=googleUser.getBasicProfile();
    $('.g-signin2').css('display','none');
    $('.username').css('display','block');
    $('.username').text(profile.getEmail());
    $('.profile-pic').css('display','block');
    $('.profile-pic').attr('src',profile.getImageUrl());
    $('.signout').css('display','block');
}
function signout(){
    var auth2=gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        swal('You Have been successfully signed out');
        $('.g-signin2').css('display','block');
    $('.username').css('display','none');
    $('.username').text('none');
    $('.profile-pic').css('display','none');
    $('.profile-pic').attr('src','none');
    $('.signout').css('display','none');
    })
}