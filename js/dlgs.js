DLG={
	showFS:function(msg,rebBtnTxt,greenBtnTxt,redBtnFn,greenBtnFn){

		$('#fSDlgCaption').html(msg);
		$('#fSDlgRedBtn').val(rebBtnTxt);
		$('#fSDlgGreenBtn').val(greenBtnTxt);
		
		$('#fSDlgGreenBtn').click(greenBtnFn);
		$('#fSDlgRedBtn').click(redBtnFn);
		$('#fullScreenDialogue').css('display','block');
	},
	
	closeFS:function(){
		$('#fullScreenDialogue').css('display','none');
	},
}