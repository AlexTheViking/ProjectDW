CV={
	
	pattern:"<img id=bigCard style='height:100%;border-radius:10%;box-shadow:  -1vh -1vh 5px #000000ff, .5vh .5vh 5px #000000ff, inset .3vh  .3vh 1px #ffffff99' src='../cards/#DECK/#ID.jpeg'>",
	
	hide:function(){
		$('#cardViewer').css('display','none');
	},
	
	showPlaying:function(deck,id){
		$('#cardViewer').html('');
		$('#cardViewer').append(this.pattern.split('#DECK').join('playing/'+deck).split('#ID').join(id));
		$('#cardViewer').css('display','flex');
	},
	
};