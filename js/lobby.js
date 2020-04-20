LBB={
	pattern:"<div style='position:relative;width:100%;margin:3px 0;height:10%;'><div class='lobbyInnerBlock' style='left:0;width:40%'>#CRTR</div><div class='lobbyInnerBlock' style='left:40%;width:20%'>#PLRS/4</div><div class='lobbyInnerBlock' style='left:60%;width:20%'>#STATUS</div><div class='lobbyInnerBlock' style='left:80%;width:calc(20% - 4px)'><button onclick='LBB.openLobby(#ID)' class='inpt' style='height:100%;padding:0;width:100%; font-size:2vh'>JOIN</button></div></div>",

	lobbies:[],
	
	openLobby:function(id){
		console.log(id);
	},
	
	createLobby:function(id,master,prls,stat){
		this.lobbies.push([id,master,prls,stat])
		},
		
	showLobbies:function(){
		$('#lobbyBox').html('');
		this.lobbies.forEach(function(item,i){
			$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(item[1]).split('#PLRS').join(item[2]).split('#STATUS').join(item[3]).split('#ID').join(item[0]));
		});
		
	},

		
};
