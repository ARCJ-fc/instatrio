//
//if (db["tweetImages"].twitObj.expiryDate + 5 < twitObj.expiryDate) {
//    db.["tweetImages"].write
//}
//
//dataEmitter("")


function catchFish(){
	var type = 'search/tweets';
	var params = {q: 'fish'};
	twitterKeys.get(type, params, function(error, data, response){
		for(var i = 0; i < data.statuses.length; i += 1) {
			console.log(data.statuses[i].text);
			tweets = data.statuses[i].text;
		}
	});
}
