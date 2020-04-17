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
//	this.mapBtn=$('#mapbtn'+id);
	this.redBtn=$('#sMapBtnRed'+id);
	this.blueBtn=$('#sMapBtnBlue'+id);
	this.greenBtn=$('#sMapBtnGreen'+id);
	this.yellowBtn=$('#sMapBtnYellow'+id);
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
		if(bool){this.isTroublesHere=true;this.troubleBtn.css('display','block')}
		else{this.isTroublesHere=false; this.troubleBtn.css('display','none')};
		};
	this.checkTroubles=function(){return this.isTroublesHere};	
		
	this.setBuilding=function(color){
		if(color!=null){
		this.building=color;
		this.houseBtn.css('backgroundImage','url("pics/'+color+'House.png")');
		this.houseBtn.css('display','block');}
		else(this.houseBtn.css('display','none'))
		
		};
	
	//for the same structure, push<Smth> for no-logic adding and add<Smth> to use game rules
	//delete<Smth> for no-logic adding and kill<Smth> to use game rules


	this.push=function(who){
		
			this[who+'C']++;
			if(this[who+'C']>0){
				this[who+'Btn'].css('display','block');
				if(this[who+'C']>1){this[who+'Btn'].html(this[who+'C'])}
				}
	};
		
	this.delete=function(who){
			this[who+'C']--;
			if(this[who+'C']<2){
				this[who+'Btn'].html('');
				if(this[who+'C']<1){
					if(this[who+'C']<0){this[who+'C']=0; console.warn('there is no unit of this kind to delete, something went wrong!')}
					this[who+'Btn'].css('display','none')}}
				else{this[who+'Btn'].html(this[who+'C'])}
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
	
	build:function(dist,player){
		if(player==null){this.districts[dist-1].setBuilding(null);return 'removed'};
		this.districts[dist-1].setBuilding(player);
	},
	
	
	distHover:function(id){
		//console.log('hovered district # '+id);
		$('#path'+id).attr('style','fill:#ffffff44;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:1,0.5');
	},	
	distLeft:function(id){
		//console.log('district # '+id+' left');
		$('#path'+id).attr('style','fill:#00000000;stroke:none;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;stroke-miterlimit:4;stroke-dasharray:none;');
	},

	bindButtons:function(){
		this.districts.forEach(function(item,i){
			item.redBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.redBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.blueBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.blueBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.greenBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.greenBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.yellowBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.yellowBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.troubleBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.troubleBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.houseBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.houseBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.demonBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.demonBtn.mouseleave(function(){MAP.distLeft(i+1)});
			item.trollBtn.mouseenter(function(){MAP.distHover(i+1)});
			item.trollBtn.mouseleave(function(){MAP.distLeft(i+1)});
			
			$('#svg8').css('display','block');

		});
	},
};


