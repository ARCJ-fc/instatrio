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

//instagram 
$.ajax({
	type: 'GET', 
	url: 'http://localhost:1337/tweets',
	success: function(data){
		$(".instalist").each(function(i) {
        $(this).text("feed:" + tweets);
        });
	};
});


 