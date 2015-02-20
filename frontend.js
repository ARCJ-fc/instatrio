//$.ajax({
//	type: 'GET', 
//	url: 'http://localhost:1337/tweets',
//	success: function(data){
//		var $wall = '#wall';
//		$wall.html(data)
//	};
//});
//
//
//function renderData(){
//	
//}

 
$.ajax({
	type: 'GET', 
	url: 'http://localhost:1337/ourtweets',
	success: function(data){
		$("#tweetdiv").prepend('<p>' + data + '</p>');
	}
});


 