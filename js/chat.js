
CHAT={

display:'popping',
//popping, shown and fixed

logMsgOn:true,
chtMsgOn:true,
menuShown:false,

getMenuShown:function(){return this.menuShown},
setMenuShown:function(bool){this.menuShown=bool},
getLogMsgOn:function(){return this.logMsgOn},
setLogMsgOn:function(bool){this.logMsgOn=bool},
getChtMsgOn:function(){return this.chtMsgOn},
setChtMsgOn:function(bool){this.chtMsgOn=bool},

allmessages:[],
clearHistory:function(){this.allmessages=[]},

lifetime:5,
getLifetime:function(){return this.lifetime},
setLifetime:function(lifetime){this.lifetime=lifetime},

pattern:'<div class="onScreenMsg#TYPE"><img class="onScreenMsgImg" src="pics/#IMGSay.png"><div class="onScreenMsgTxt"> #TEXT </div></div>',

getDisplay:function(){return this.display},
setDisplay:function(mode){this.display=mode},

push:function(user,text){
	type='';
	if(user=='system'){type='SYS'}else{type='CHT'}
	content=this.pattern.split('#TEXT').join(text).split('#IMG').join(user).split('#TYPE').join(type);
	this.allmessages.push(content);
	
	if(this.display=='popping'){
		$('#chatbox').append(content);
		setTimeout(function(){$('#chatbox').children().first().remove()},CHAT.lifetime*1000)}
	else{$('#logmsgbox').append(content);};
		
	if(this.display=='shown'){$('#logbox').scrollTop($('#logmsgbox').height());};


	if(!CHAT.getChtMsgOn()){$('.onScreenMsgCHT').css('display','none')};
	if(!CHAT.getLogMsgOn()){$('.onScreenMsgSYS').css('display','none')};
	
},


clearLogbox:function(){
	$('#logmsgbox').html('');	
},
clearChatbox:function(){
	$('#chatbox').html('');	
},

showLog:function(){
	this.clearLogbox();
	this.clearChatbox();
	this.display='shown';
	this.allmessages.forEach(function(item,i){
		$('#logmsgbox').append(item);
	});
	$('#logbox').css('display','block');
	$('#logbox').scrollTop($('#logmsgbox').height());
	
	if(!CHAT.getChtMsgOn()){$('.onScreenMsgCHT').css('display','none')};
	if(!CHAT.getLogMsgOn()){$('.onScreenMsgSYS').css('display','none')};
},

hideLog:function(){
	$('#logbox').css('display','none');
	this.display='popping';
},


bindBtns:function(){
	
	$('#chatLook').mouseenter(function(){
		if(CHAT.getDisplay()=='popping'){
		CHAT.showLog()}
	});
	$('#chatLook').mouseleave(function(){
		if(CHAT.getDisplay()=='shown'){
			CHAT.hideLog();
		};
	});
	
	$('#chatLook').click(function(){

		if(CHAT.getDisplay()=='shown'){
			$('#chatLook').css('border','solid 3px #ff0000');
			CHAT.setDisplay('fixed');
			$('#logbox').css('overflow-y','scroll')}
		else{
			$('#chatLook').css('border','solid 1px #000000');
			CHAT.setDisplay('shown');
			$('#logbox').css('overflow-y','hidden')}
	});
	
	
	$('#chatFilter1').click(function(){
		if(CHAT.getChtMsgOn()){CHAT.setChtMsgOn(false);$('#chatFilter1').css('border','solid 3px #ff0000');
		$('.onScreenMsgCHT').css('display','none');
		CHAT.push('system','chat messages are hidden')}
		else{CHAT.setChtMsgOn(true);$('#chatFilter1').css('border','solid 1px #000000');
		$('.onScreenMsgCHT').css('display','block');
		CHAT.push('system','chat messages are shown')}
	});
	
	$('#chatFilter2').click(function(){
		if(CHAT.getLogMsgOn()){CHAT.setLogMsgOn(false);$('#chatFilter2').css('border','solid 3px #ff0000');
		CHAT.push('system','system messages are hidden');
		$('.onScreenMsgSYS').css('display','none')}
		else{CHAT.setLogMsgOn(true);$('#chatFilter2').css('border','solid 1px #000000');
		$('.onScreenMsgSYS').css('display','block');
		CHAT.push('system','chat messages are shown')}
	});
	
	$('#chatSettings').click(function(){
		if(!CHAT.getMenuShown()){
			$('#chatSettingsMenu').css('display','flex');
			$('#chatSettings').css('border','solid 3px #ff0000');
			CHAT.setMenuShown(true);
			$('#chatLifetimeSeeker').attr('value',CHAT.getLifetime());
			$('#chatLifetimeTxt').html(CHAT.getLifetime());
			}
		else{
			$('#chatSettingsMenu').css('display','none');
			$('#chatSettings').css('border','solid 1px #000000');
			CHAT.setMenuShown(false)}	
	});
	
	
	
	$('#chatSettingsMenuItemsContainer').mouseleave(function(){
		$('#chatSettings').click();
	});
	
	$('#chatLifetimeSeeker').change(function(){
		CHAT.setLifetime($('#chatLifetimeSeeker').val());
		$('#chatLifetimeTxt').html(CHAT.getLifetime());
		CHAT.push('system','lifetime of popping messages now set as '+CHAT.getLifetime()+' sec.');
	});
	
	$('#chatClearHistoryBtn').click(function(){
		CHAT.clearHistory();
		CHAT.push('system','chat and log history is cleared')
	});

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
