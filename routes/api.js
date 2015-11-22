var express = require('express');
var crawler = require('./../lib/crawler');
var router = express.Router();

/* GET api heartbeat. */
router.get("/", function(request, response, next){
	response.send("Api is running.");
});

router.get("/stories", function(request, response, next){
	
	// get stories from crawler
	var storiesCallback = function(stories) {
		response.send(stories);
	};
	
	crawler.getStoriesFromCrawler(storiesCallback);
});

module.exports = router;