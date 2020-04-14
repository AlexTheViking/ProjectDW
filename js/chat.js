
CHAT={
	isBig:false,
	nameClicked:false,
	
	checkIfName:function(){
	    return this.nameClicked;
	},
	
	setNameClicked:function(bool){
	    this.nameClicked=bool;
	},
	
	checkIsBig:function(){
		return this.isBig;
	},
	
	setBig:function(bool){
		this.isBig=bool;
	},
};


/*
CHATTIMER=setInterval(function(){
	$.post('php/chat.php',function(data){
	$('#msgbox').html(data);
	
	if(!CHAT.checkIsBig()){
	$('#chatbox').scrollTop($('#msgbox').height());
	};
	

$('.chatchatname').click(function(event){
	    console.log(event.target.value);
	    $('#chatinput').val($('#chatinput').val()+event.target.value+', ');
	    CHAT.setNameClicked(true);
});

	
	
	});
}, 1000);

*/

$('#chatbutton').click(function(){
	
	if($('#chatinput').val()!==''){
		console.log('sending request...');
		$.post('php/speak.php',{msg:$('#chatinput').val()},function(data){
		console.log(data);
			});
		$('#chatinput').val('');	
	}		
});

$('#chatinput').keypress(function(event){
	if(event.which === 13) {
		$('#chatbutton').click();
	}
});

$('#chatbox').click(function(){
    if(!CHAT.checkIfName()){	
	    if(!CHAT.checkIsBig()){
		    $('#chatbox').css('height','98vh');
		    $('#chatbox').css('top','0');
		    $('#chatbox').css('left','50vw');
		    $('#chatbox').css('width','50vw');
		    $('#chatbox').css('position','fixed');
		    $('#chatbox').css('overflow-y','scroll');
		    $('#chatbox').css('border-radius','0');
		    CHAT.setBig(true);}
	    else{
		    $('#chatbox').css('height','20%');
		    $('#chatbox').css('top','0');
		    $('#chatbox').css('left','0');
		    $('#chatbox').css('width','90%');
		    $('#chatbox').css('position','relative');
		    $('#chatbox').css('overflow-y','hidden');
		    $('#chatbox').css('border-radius','10px 10px 0 0');
		    CHAT.setBig(false);
	    }
        
    }else{CHAT.setNameClicked(false)}	
	
});