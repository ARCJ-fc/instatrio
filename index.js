var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
    Twitter = require('twitter'),
	events = require('events'),
    Insta = require('instagram-node').instagram(),
	tweets,
    keyChain = require('./key.js');

function requestHandler(request, response){
	var reqName = path.basename(request.url) || 'index.html';
	if (reqName === 'tweets') {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write(tweets);
	} else {
		fs.readFile(__dirname + '/' + 'index.html', function(err, data){
			if (!err) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
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


var twitterKeys = new Twitter({
	consumer_key: keyChain.consumer_key,
	consumer_secret: keyChain.consumer_secret,
	access_token_key: keyChain.access_token_key,
	access_token_secret: keyChain.access_token_secret
}); //Rory's Twitter keys

var instaKeys = new Insta({
    client_id: keyChain.client_id,
    client_secret: keyChain.client_secret
}); //anit's instagram keys



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


//insta






