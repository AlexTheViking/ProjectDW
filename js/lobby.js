LBB={
	pattern:"<div style='position:relative;width:100%;margin:3px 0;height:10%;'><div class='lobbyInnerBlock' style='left:0;width:40%'>#CRTR</div><div class='lobbyInnerBlock' style='left:40%;width:20%'>#PLRS/4</div><div class='lobbyInnerBlock' style='left:60%;width:20%'>#STATUS</div><div class='lobbyInnerBlock' style='left:80%;width:calc(20% - 4px)'><button onclick='LBB.openLobby(\"#ID\")' class='inptB' style='height:100%;padding:0;width:100%; font-size:2vh'>JOIN</button></div></div>",

	lobbies:[],
	page:0,
	setPage:function(page){this.page=page},
	getPage:function(){return this.page},
	
	
	checkPage:function(i){
	if(LBB.lobbies[i*8]){return true}else{return false};
	},
	
	getPages:function(){
	i=0;
	while(this.checkPage(i)){i++};
	return i;
	},
	
	openLobby:function(id1){
		console.log(id1);
		$.post('php/join_game.php',{id:id1},function(data){console.log(data)});
	},
	
	createLobby:function(id,master,prls,stat){
		this.lobbies.push([id,master,prls,stat]);
		},
		
	getLobbies:function(){
		this.lobbies=[];
		$.post('php/game_list.php',function(data){
			console.log(data);
			console.log(JSON.parse(data));
			JSON.parse(data).forEach(function(item,i){
				LBB.createLobby(item.id,item.players[0],item.players.length,'waiting');
			});
		LBB.showLobbies(0);	
		})
	},
		
	showLobbies:function(page){
		
		
		if(!this.checkPage(page)&&page!=0){return false};
		$('#lobbyBox').html('');
		$('#lobbyPage').html(page+1+'/'+this.getPages());
		this.setPage(page);
		
		xx=0;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=1;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=2;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=3;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=4;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=5;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=6;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		xx=7;if(this.lobbies[xx+page*8]){$('#lobbyBox').append(LBB.pattern.split('#CRTR').join(this.lobbies[xx+page*8][1]).split('#PLRS').join(this.lobbies[xx+page*8][2]).split('#STATUS').join(this.lobbies[xx+page*8][3]).split('#ID').join(this.lobbies[xx+page*8][0]));}
		
	},
	
	bindButtons:function(){
		$('#leftLobbyBtn').click(function(){LBB.showLobbies(LBB.getPage()-1)});
		$('#rightLobbyBtn').click(function(){LBB.showLobbies(LBB.getPage()+1)});
		$('#CreateGameButton').click(function(){
			console.log('few');
			$.post('php/new_game.php',{maxPlayers:'4'},function(data){console.log(data)})
		});
		
		$('#reloadLobbyBtn').click(function(){LBB.getLobbies()});
	},

		
};
