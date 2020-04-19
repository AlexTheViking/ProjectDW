DLG={
	showFS:function(msg,greenBtnTxt,greenBtnFn,redBtnTxt,redBtnFn){

		$('#fSDlgCaption').html(msg);
		$('#fSDlgGreenBtn').val(greenBtnTxt);
		$('#fSDlgGreenBtn').click(greenBtnFn);
		
		if(typeof redBtnTxt!=='undefined'){
				$('#fSDlgRedBtn').css('display','inline-block');
				$('#fSDlgRedBtn').click(redBtnFn);
				$('#fSDlgRedBtn').val(redBtnTxt);
				$('#fSDlgGreenBtn').css('left','6.6%');
				}
		else{
				$('#fSDlgRedBtn').css('display','none');
				$('#fSDlgGreenBtn').css('left','27.5%');
		}
		$('#fullScreenDialogue').css('display','block');
	},
	
	closeFS:function(){
		$('#fullScreenDialogue').css('display','none');
	},
}