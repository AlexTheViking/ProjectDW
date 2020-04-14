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
					$.post('php/create.php',{login:$('#signUpInput').val(),passwd:$('#sighUpPass').val(),submit:'OK'},function(data){
					console.log(data);
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
		});	
		}else{$('#logInWorn').text('Please, fill all the fields.');$('#logInWorn').css('display','block')};
	});

$('#logoutBtn').click(function(){
	DLG.showFS('Are you sure you want to log out?','Yes, log out now.','No, wait a minute...',
	function(){
		$.post('php/logout.php',function(data){
		console.log(data);DLG.closeFS();
	})},
		function(){DLG.closeFS()});
});
	