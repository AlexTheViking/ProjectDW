
$(function(){
//main function that starts as soon as DOM of index.html is ready
	
	DESK.getCards();

	
	$('#preloader').css('display','none');

	//get parts and appends them to their places then lets script go further
		Resizer.checkAuto();
		Resizer.resize();
		//resizes right part of interface to make it take all the place that left after map css resizing 

		CHAT.bindBtns();
		LBB.bindButtons();
		
//		Не удалять!! запрос к пхп!!!

$.post('php/check_login.php',function(data){
//sends post-request to find out weather user is loged in or not
	console.log(data);
	if(data==='false'){
		ACT.display('login');
		//see actions.js
		$('#logoutBtn').css('display','none');
	}else{
		$('#greetingsUsername').html(data);
		ACT.display('greetingsBox');
	};
});


		MAP.getDistricts();
		//creates jquery objects from districts images and saves them into MAP object
	
		MAP.bindButtons();
		//assigns buttons with districts

		
		//TEMPORARY CODE--------------------------------------------------------------------------------
		//
		//
		
		//		setTimeout(function(){ACT.display('playDesk')},2000);

		//
		//
		//----------------------------------------------------------------------------------------------
		
});

$(window).resize(function(){
//starts as window is resized
	Resizer.checkAuto();
	Resizer.resize();
});