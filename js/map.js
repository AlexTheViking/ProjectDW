function District (id){
	//district constructor
	this.id=id;
	
	this.isAvaliable=true;
	this.isTroublesHere=false;
	this.building='Grey';
	this.owner=0;
	
	this.redC=0;
	this.blueC=0;
	this.greenC=0;
	this.yellowC=0;
	this.trollC=0;
	this.demonC=0;
	this.house=null;
	this.map=$('#map'+id);
	this.mapBtn=$('#mapbtn'+id);
	this.mapBtnRed=$('#sMapBtnRed'+id);
	this.mapBtnBlue=$('#sMapBtnBlue'+id);
	this.mapBtnGreen=$('#sMapBtnGreen'+id);
	this.mapBtnYellow=$('#sMapBtnYellow'+id);
	this.troubleBtn=$('#troubleBtn'+id);
	this.houseBtn=$('#houseBtn'+id);
	this.demonBtn=$('#demonBtn'+id);
	this.trollBtn=$('#demonBtn'+id);
	
	this.setAvaliable=function(bool){
		if(bool){this.isAvaliable=true;this.map.css('display','block')}
		else{this.isAvaliable=false;this.map.css('display','none')};
		};
		
	this.setTroubles=function(bool){
		if(bool){this.isTroublesHere=true;this.troubleBtn.css('backgroundImage','url("pics/neprBlack.png")')}
		else{this.isTroublesHere=false; this.troubleBtn.css('backgroundImage','url("pics/neprGrey.png")')};
		};
		
	this.setBuilding=function(color){
		this.building=color;
		this.houseBtn.css('backgroundImage','url("pics/house'+color+'.png")');
		};	
	
};

MAP={
	
	districts:[null,null,null,null,null,null,null,null,null,null,null,null],
	
	getDistricts:function(){
		this.districts.forEach(function(item,i){
			MAP.districts[i]= new District(i+1);
		});
		
	},

};
