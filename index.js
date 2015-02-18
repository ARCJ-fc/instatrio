var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
//	Twitter = require('twitter'),
	events = require('events'),
	insta = require('instagram-node').instagram(),
	tweets,
	key = require('./key.js');

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


function catchFish(){
	var type = 'search/tweets';
	var params = {q: 'fish'};
	key.get(type, params, function(error, data, response){
		for(var i = 0; i < data.statuses.length; i += 1) {
			console.log(data.statuses[i].text);
			tweets = data.statuses[i].text;
		}
	});
}