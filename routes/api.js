var express = require("express");
var crawler = require("./../lib/crawler");
var router = express.Router();

router.get("/", function(request, response, next){
	response.send("Api is running.");
});

router.get("/test", function(request, response, next){
	throw "exception";
});

router.get("/stories", function(request, response, next){
	
	// get stories from crawler
	var storiesCallback = function(stories) {
		var data = {stories: stories};
		response.send(data);
	};
	
	crawler.getStoriesFromCrawler(storiesCallback);
});

module.exports = router;