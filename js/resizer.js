Resizer={
	getScreenWidth:function(){
		return $(window).width(); 	
	},

	getMapWidth:function(){
		return $('#mapbox').width();
	},
	
	resizeMain:function(){
		$('#main').css('width',this.getScreenWidth()-this.getMapWidth()-25);
	},
	
};
