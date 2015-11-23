/**
* Test web crawler service
*/
var model = require("./model");
var crawler = require("crawlerx");
var settings = { decode:"utf-8", deep:1, concurrency:1 };

module.exports = {
  getStoriesFromCrawler: getStoriesFromCrawler
};

function getStoriesFromCrawler(callback) {
	
	// This is where we configure what websites we want 
	// to parse.
	parseWebsite(
		"http://www.en.prothom-alo.com/bangladesh",
		parseProthom,
		callback
	);
}

function parseWebsite(url, parser, callback) {
	
	crawler.request(
		url, 
		settings,
		function(error, $, body, url, resp) {
			callback(parser($));
		}
	);
}

function parseProthom($) {
	
	var data = $(".each_news");
	
	var stories = [];
	var storyId = 0;
	data.each(function(article){
		
		var title = $(this).find(".title").text();
		var summary = $(this).find(".content").text();
		var body = "";
		var date = "";
		var source = "";
		var previewImg = "";
		
		var story = model.createStory(
			storyId++, title, summary, body, date, source, previewImg);
		stories.push(story);
	});
	
	return stories;
}