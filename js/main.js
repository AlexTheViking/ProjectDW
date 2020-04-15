
$(function(){
//main function that starts as soon as DOM of index.html is ready

Resizer.resizeMain();
//resizes right part of interface to make it take all the place that left after map css resizing 

//		Не удалять!! запрос к пхп!!!
/*
$.post('php/login_check.php',function(data){
//sends post-request to find out weather user is loged in or not
	console.log(data);
	if(data==='False'){
		ACT.display('login');
		//see actions.js
		$('#logoutBtn').css('display','none');
	}else{
		$('#greetingsUsername').html(data);
		ACT.display('greetingsBox');
	};
});
*/

MAP.getDistricts();
//creates jquery objects from districts images and saves them into MAP object
MAP.bindButtons();
//assigns buttons with districts

});

$(window).resize(function(){
//starts as window is resized
	Resizer.resizeMain();
});