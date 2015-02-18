var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	Twitter = require('twitter'),
	events = require('events'),
	insta = require('instagram-node').instagram(),
	tweets;
	// credentials = require('twittercreds.js');

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

var client = new Twitter({
	consumer_key: '0NE1Xoy4LOwiRuPBQYOZxAdsy',
	consumer_secret: 'FwlWrejjFsJzh57JSd1OXlVFi2djcghERQNhHWsYZkgCLKUVxZ',
	access_token_key: '281746499-SfqRkJFWWD447WgouP184FlS1EkJ6CTJajYT5G0A',
	access_token_secret: 'uzLRrD1ZAi2UgNk12kK7F6HQq4AXZNW8rG8mbsR2z6WsI'
});

function catchFish(){
	var type = 'search/tweets';
	var params = {q: 'fish'};
	client.get(type, params, function(error, data, response){
		for(var i = 0; i < data.statuses.length; i += 1) {
			console.log(data.statuses[i].text);
			tweets = data.statuses[i].text;
		}
	});
}