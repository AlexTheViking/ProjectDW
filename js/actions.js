ACT={
displayed:null,

display:function(name){
	if(this.displayed){this.displayed.css('display','none')};
	$('#'+name).css('display','block');
	this.displayed=$('#'+name);
},

};

$('#loginSingUpButton').click(function(){ACT.display('signUp')});

$('#signUpCancelButton').click(function(){ACT.display('login')});

$('#signUpSignUpButton').click(function(){
	if($('#signUpInput').val()!=''&&$('#sighUpPass').val()!=''&& $('#confirmPass').val()!=''){
		$('#singUpWorn').css('display','none');
			if($('#sighUpPass').val()==$('#confirmPass').val()){
					console.log('sending request...');
					$.post('php/create_account.php',{login:$('#signUpInput').val(),passwd:$('#sighUpPass').val()},function(data){
					if(data=='OK'){DLG.showFS('Your account has been successfully created.<br>Now you can sign in using your new login and password','OK',function(){ACT.display('login');DLG.closeFS()})}
					else{DLG.showFS(data,'OK',function(){DLG.closeFS()})};
				});
			}else{$('#singUpWorn').text('Passwords don`t match.');$('#singUpWorn').css('display','block')};	
		}else{$('#singUpWorn').text('Please, fill all the fields.');$('#singUpWorn').css('display','block')};
	});
	
$('#loginLogInButton').click(function(){
	if($('#loginInput').val()!=''&&$('#passInput').val()!=''){
		$('#logInWorn').css('display','none');
		console.log('sending request...');
		$.post('php/login.php',{login:$('#loginInput').val(),passwd:$('#passInput').val()},function(data){
		console.log(data);
		if(data=='OK'){ACT.display('greetingsBox')}else{DLG.showFS(data,'OK',function(){DLG.closeFS()})};
		});	
		}else{$('#logInWorn').text('Please, fill all the fields.');$('#logInWorn').css('display','block')};
	});

$('#logoutBtn').click(function(){
	DLG.showFS('Are you sure you want to log out?',
	function(){
		$.post('php/logout.php',function(data){
		console.log(data);DLG.closeFS();
	})},'Yes, log out now.','No, wait a minute...',
		function(){DLG.closeFS()});
});
	