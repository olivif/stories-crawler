var index = require("./index");

var js2xmlparser = require("js2xmlparser");

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

function exportStoriesToXml(stories) {
	
	var options = {
		arrayMap: {
			"music": "song"
		}
	};

	var xml = js2xmlparser("music", stories, options);
	
	return xml;
}

function createStory(id, title) {
	
	// Clean up whitespace
	title = title.trim();
	
	var story = {
		"@": {
			"type": "song"
		},
		id: id,
		title: title,
		artist: "",
		duration: "",
		thumb_url: ""
	};
	
	return story;
}