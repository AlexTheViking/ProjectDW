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
	this.trollBtn=$('#trollBtn'+id);
	
	this.getCount=function(unit){
		return this[unit+'C'];
	};
	
	this.checkEmpty=function(){
		if(this.redC===0&&this.blueC===0&&this.greenC===0&&this.yellowC===0&&this.trollC===0&&this.demonC===0){
			return true;}
		else{return false}
	};
	
	this.getID=function(){return this.id};
	
	this.setAvaliable=function(bool){
		if(bool){this.isAvaliable=true;this.map.css('display','block')}
		else{this.isAvaliable=false;this.map.css('display','none')};
		};
		
	this.setTroubles=function(bool){
		if(bool){this.isTroublesHere=true;this.troubleBtn.css('backgroundImage','url("pics/neprBlack.png")')}
		else{this.isTroublesHere=false; this.troubleBtn.css('backgroundImage','url("pics/neprGrey.png")')};
		};
	this.checkTroubles=function(){return this.isTroublesHere};	
		
	this.setBuilding=function(color){
		this.building=color;
		this.houseBtn.css('backgroundImage','url("pics/house'+color+'.png")');
		};
	
	//for the same structure, push<Smth> for no-logic adding and add<Smth> to use game rules
	//delete<Smth> for no-logic adding and kill<Smth> to use game rules


	this.push=function(who){
		if(who=='demon'||who=='troll'){
			this[who+'C']++;
			if(this[who+'C']>0){
				this[who+'Btn'].css('backgroundImage','url("pics/'+who+'Red.png")');
				if(this[who+'C']>1){this[who+'Btn'].html(this[who+'C'])}
				}}
		else{
			this[who.toLowerCase()+'C']++;
			this['mapBtn'+who[0].toUpperCase()+who.slice(1)].html(this[who.toLowerCase()+'C']);
		}		
	};
		
	this.delete=function(who){
		if(who=='demon'||who=='troll'){
			this[who+'C']--;
			if(this[who+'C']<2){
				this[who+'Btn'].html('');
				if(this[who+'C']<1){
					if(this[who+'C']<1){this[who+'C']=0; console.warn('there is no this kind of unit to delete, something went wrong!')}
					this[who+'Btn'].css('backgroundImage','url("pics/'+who+'Grey.png")')}}
				else{this[who+'Btn'].html(this[who+'C'])}}
		else{
			this[who.toLowerCase()+'C']--; 
			if(this[who.toLowerCase()+'C']<0){
				this[who.toLowerCase()+'C']=0; console.warn('there is no this kind of unit to delete, something went wrong!')
			}
			this['mapBtn'+who[0].toUpperCase()+who.slice(1)].html(this[who.toLowerCase()+'C']);
		}		
	};	
	
};

MAP={
	
	districts:[null,null,null,null,null,null,null,null,null,null,null,null],
	
	neighborhood:[[2,3,12],[1,3,4,10,11,12],[1,2,4],[2,3,5,6,10],[4,6,7,8,10],[4,5,7],[5,6,8],[5,7,9],[8,10,11],[2,4,5,9,11],[2,9,10,12],[1,2,11]],
	
	getDistricts:function(){
		this.districts.forEach(function(item,i){
			MAP.districts[i]= new District(i+1);
		});
		
	},
	
	getNeighbors:function(dist){return this.neighborhood[dist-1]},
	
	
	setAvaliability:function(dists){
		this.districts.forEach(function(item,i){
			if(dists.indexOf(item.getID())!=-1){MAP.districts[i].setAvaliable(true)}
			else{MAP.districts[i].setAvaliable(false)};
		});
	
	},
	
	displayAvaliability:function(player,action){
		
		dist=[];
		
		if(action=='build'){
			this.districts.forEach(function(item,i){
			if(!item.checkTroubles()&&item.getCount(player)>0){dist.push(i+1)}
			});
		};

		if(action=='add'){
			this.districts.forEach(function(item,i){
			if(item.getCount(player)>0){dist=dist.concat(MAP.getNeighbors(i+1));dist.push(i+1)}
			});
		};
		
		if(action=='kill'){
			this.districts.forEach(function(item,i){
			if(item.checkTroubles()&&!item.checkEmpty()){dist.push(i+1)}
			});
		};
		
		this.setAvaliability(dist);
	
	},
	
	add:function(dist,unit){
		if(!this.districts[dist-1].checkEmpty()){this.districts[dist-1].setTroubles(true)};
		this.districts[dist-1].push(unit);
	},
	
	kill:function(dist,unit){
		this.districts[dist-1].delete(unit);
		this.districts[dist-1].setTroubles(false);
	},

};
