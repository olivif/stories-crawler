var index = require("./index");

var express = require("express");
var app = express();

app.get("/api", function(request, response){
	response.send("Api is running.");
});

app.get("/api/stories", function(request, response){
	
	// get stories from crawler
	var storiesCallback = function(stories) {
		response.send(stories);
	};
	
	index.getStoriesFromCrawler(storiesCallback);
});

app.listen(4242);