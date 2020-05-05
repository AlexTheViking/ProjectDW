DESK={

//-----------------------------------------------------------------------
//some code to make randomization of colors and position posible
//-----------------------------------------------------------------------
players:[
	{color:'red',name:''},//place for this player
	{color:'blue',name:''},
	{color:'green',name:''},
	{color:'yellow',name:''},
],
setPlayer:function(position,color,name){
	this.players[position].color=color;	
	this.players[position].name=name;	
},
getPlayerColor:function(position){
	return this.players[position].color;
},


onDesk:[],	

//---------------------------------------------------------
//block that keeps info and manage hands, cards etc...
//---------------------------------------------------------
player0Hand:['grn_0','grn_1','grn_2','grn_3','grn_4'],
player1Hand:['x','x','x','x','x'],
player2Hand:['x','x','x','x','x'],
player3Hand:['x','x','x','x','x'],

setHands:function(hand0,hand1,hand2,hand3){
	this.player0Hand=hand0;
	this.player1Hand=hand1;
	this.player2Hand=hand2;
	this.player3Hand=hand3;
	this.displayHand();
	this.displayHandOf(1);
	this.displayHandOf(2);
	this.displayHandOf(3);
},

giveCard:function(deck,id){
	//$('#playerHand').append(DESK[deck][id]);
	//DESK[deck][id].css('width','30%');
	DESK[deck][id].css('margin','-25%');
	DESK[deck][id].appendTo($('#playerHand'));
},
displayHand:function(){
	$('#playerHand').html('');
	console.log($('#playerHand'));
		this.player0Hand.forEach(function(item,i){
			DESK.giveCard(item.split('_')[0],item.split('_')[1]);
		});
},
displayHandOf:function(id){
	$('#playerHand'+id).html('');
	this['player'+id+'Hand'].forEach(function(item,i){
		if(item=='x'){DESK.giveCardTo(id)}else{};//there is a place for special cards
	});
},

//--------------------------------------------------------
//arrays to keep jquery objects representing playing cards
//and methods to handle them
//--------------------------------------------------------
grn:[],
yel:[],
getGreenCards:function(){
	for(i=0;i<48;i++){
		jqObj=DESK.pattern.split('#COLLOR').join('GRN').split('#ID').join(i);
		DESK.grn.push($(jqObj));
	};
},
getYellowCards:function(){
	for(i=0;i<53;i++){
		jqObj=DESK.pattern.split('#COLLOR').join('YEL').split('#ID').join(i);
		DESK.yel.push($(jqObj));
	};
},
getCards:function(){
	this.getGreenCards();
	this.getYellowCards();
	this.bindCardsActions();
},
//---------------------------------------
// html patterns for displaying elements
//---------------------------------------
back:"<img src='cards/playing/back.jpeg' class='Card'>",
pattern:"<img src='cards/playing/#COLLOR/#ID.jpeg' class='Card' data-clr=#COLLOR data-id=#ID data-money=#M data-serv=#S data-kill=#K data-event=#E data-move=#M data-unic=#U>",
servant:'<img src="pics/#CLR.png" style="height:100%;margin:-80%">',	
house:'<img src="pics/#CLRHouse.png" style="height:100%;margin:-80%">',	


giveServ:function(position){
	$('#playerServs'+position).append(this.servant.split('#CLR').join(this.players[position].color));
},
giveHouse:function(position){
	$('#playerHouses'+position).append(this.house.split('#CLR').join(this.players[position].color));
},

giveGold:function(position){
	$('#playerGold'+position).append('<img src="pics/gold.png" style="height:100%;margin:-80%">');
},
giveSilver:function(position){
	$('#playerSilver'+position).append('<img src="pics/silver.png" style="height:100%;margin:-80%">');
},

	





playCard:function(deck,id){
	//$('#playerHand').append(DESK[deck][id]);
	//DESK[deck][id].css('width','60%');
	DESK[deck][id].css('height','100%');
	//DESK[deck][id].css('width','auto');
	DESK[deck][id].css('margin','-50%');
	DESK[deck][id].appendTo($('#onDeskCards'));
},

giveCardTo:function(player){
	$('#playerHand'+player).append(this.back);
},



bindCardsActions:function(){
	this.grn.forEach(function(item){
		item.mouseenter(function(){
			CV.showPlaying(item.data().clr,item.data().id);
			item.css('opacity','0');
			});
		item.mouseleave(function(){
			CV.hide();
			item.css('opacity','1');
			});
		item.click(function(){
			DESK.playCard(item.data().clr.toLowerCase(),item.data().id);
			item.click(function(){console.log('already played')});
			item.css('opacity','1');
			$('#cardViewer').css('display','none');
			$('#playerHand').css('pointer-events','none');
			});
		
	
	//	item.click(function(){
	//		$('#playerHand').css('position','fixed');
	//		$('#playerHand').css('left','10%');
	//		$('#playerHand').css('top','25%');
	//		$('#playerHand').css('height','50%');
	//		$('#playerHand').css('width','80%');
	//		});
	});
	
},







};

