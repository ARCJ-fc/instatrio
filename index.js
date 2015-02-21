var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
    Twitter = require('twitter'),
	events = require('events'),
    ig = require('instagram-node').instagram(),
	tweets,
    tweetsArray = [],
    keyChain = require('./key.js'),
    mongojs = require('mongojs');

function requestHandler(request, response){
	var reqName = path.basename(request.url) || 'index.html';
	if (reqName === 'ourtweets') {
		response.writeHead(200, {'content-Type': 'application/javascript'});
		response.write(tweetsArray);
        response.end();
	} else {
		fs.readFile(__dirname + '/' + 'index.html', function(err, data){
			if (!err) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
               
                //instagram
//                response.write(JSON.stringify(medias));
                
				response.end();
			} else {
				response.writeHead(404, {'Content-Type': 'text/html'});
				response.end('<h1>Error</h1>');
			}
		});
	}
}

http.createServer(requestHandler).listen(1337);
console.log('Server up and running');


var twitterObj = new Twitter({
	consumer_key: keyChain.consumer_key,
	consumer_secret: keyChain.consumer_secret,
	access_token_key: keyChain.access_token_key,
	access_token_secret: keyChain.access_token_secret
}); //Rory's Twitter keys


//twitter
function catchFish(){
	var type = 'search/tweets';
	var params = {q: 'fish'};
	twitterObj.get(type, params, fishGutter);
}



function fishGutter(error, data, response){
		for(var i = 0; i < data.statuses.length; i++) {
			console.log(data.statuses[i].text);
			tweets = data.statuses[i].text;
            tweetsArray.push(tweets);
		}
}

//instagram
ig.use({ 
    client_id: keyChain.client_id,
    client_secret: keyChain.client_secret 
});

ig.tag_media_recent('coding', function(err, medias, pagination, remaining, limit) {
    for (var i = 0; i < 10; i++) {
        console.log(medias[i].images.standard_resolution.url);
    }
});


//Database ======================================================//
//var db = ('mongodb://lottie-em:arcjrules@ds039281.mongolab.com:39281/arcj', ["tweetsImages", "instaImages"]);
//
//twitObjs = {
//    name: searchTerm.toLowerCase,
//    expiryDate:
//    twArray: []
//}
//    {
//        name: "charlotte",
//        url: "www.yolo.jpeg",
//        post_link: "www.yolo.com/post1",
//        hashtag: "yolo"
//    }
//
//searchTerm = 'people';
//urlify
//
//searchedThings = ["confectionary", "articleofclothing", "cake", "pastries", "departmentstores"];
//
//function prevSearches(searching) {
//    if(searchedThings.indexOf(searching.toLowerCase === -1){
//       searchedThings.push(searching.toLowerCase);
//    } else {
//        databaseQuery(searchTerm.toLowerCase);
//    }
//function databaseQuery(findme){
//    db.twitterImages.find({name: findme}, function(error, twitterImages){
//        if(err){
//          throw err;  
//        } else {
//            twitterImages.forEach(function)
//        }
//    })
//}
//
//}
//
//
//db.tweetImages.
//
//
