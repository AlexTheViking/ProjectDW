PJoiner={
	getParts: async function(url,parID,callback){
	mapPart=$.get(url,function(data){
			if(data!=null){
			$('#'+parID).append(data);	
			}
		})
	
	callback(await mapPart);
	},
};