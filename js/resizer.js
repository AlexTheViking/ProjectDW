Resizer={
	
	auto:true,
	
	mode:'allheight',
	//allheihgt,mobile,percent
	percent:50,
	
	setMode:function(mode){
	this.mode=mode;
	this.resize();
	},
	
	setPercent:function(percent){this.percent=persent},
	setAuto:function(bool){this.auto=bool},

	checkAuto:function(){
		if(this.auto){
					
			rate=this.getScreenWidth()/this.getScreenHeight()
			//console.log(rate);
			if(rate<1&&this.mode!='mobile'){this.setMode('mobile');console.log('auto set "mobile" mode')};
			if(rate>1&&rate<1.7&&this.mode!='percent'){this.setMode('percent');console.log('auto set "percent" mode')};
			if(rate>1.7&&this.mode!='allheight'){this.setMode('allheight');console.log('auto set "allheight" mode')};
			
			
			};
	},

	
	getScreenWidth:function(){
		return window.innerWidth; 	
	},

	getScreenHeight:function(){
		return window.innerHeight; 	
	},

	
	getMapWidth:function(){
		return $('#mapbox').width();
	},
	
	resize:function(){
		
		if(this.mode=='allheight'){
			$('#mapbox').css('height','98vh');
			$('#mapbox').css('width','auto');
			$('#mapback').css('width','auto');
			$('#mapback').css('height','98vh');
			$('.mappart').css('width','auto');
			$('.mappart').css('height','98vh');
			$('#main').css('width',this.getScreenWidth()-this.getMapWidth());
			$('#main').css('left',this.getMapWidth());
			$('#main').css('position','absolute');
			$('#main').css('height','98vh');
			$('#mapbox').css('top',0);			
		};
	
		if(this.mode=='percent'){
			$('#mapbox').css('width',this.percent+'vw');
			$('#mapbox').css('height','auto');
			$('#mapbox').css('top',($('body').height()-$('#mapbox').height())/2);
			$('#mapback').css('width','100%');
			$('#mapback').css('height','auto');
			$('.mappart').css('width','100%');
			$('.mappart').css('height','auto');
			$('#main').css('width',(100-this.percent)+'vw');
			$('#main').css('position','absolute');
			$('#main').css('left','50vw');
			$('#main').css('height','98vh');
		};

		if(this.mode=='mobile'){
			$('#mapbox').css('width','98vw');
			$('#mapbox').css('height','auto');
			$('#mapback').css('width','100%');
			$('#mapback').css('height','auto');
			$('.mappart').css('width','100%');
			$('.mappart').css('height','auto');
			$('#main').css('width','98vw');
			$('#main').css('position','relative');
			$('#main').css('left','0');
			$('#main').css('height','auto');
		};

			
		if($('#main').width()<$('#main').height()){
			$('#actionbox').width($('#main').width());
			$('#actionbox').height($('#main').width());
			$('#actionbox').css('left',0);
			$('#actionbox').css('top',($('#main').height()-$('#actionbox').height())/2);}
		else{
			$('#actionbox').width($('#main').height());
			$('#actionbox').height($('#main').height());
			$('#actionbox').css('top',0);
			$('#actionbox').css('left',($('#main').width()-$('#actionbox').width())/2);
		};
			
	},
	
};
