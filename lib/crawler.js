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
	parseWebsite(prothomParser, callback);
}

function parseWebsite(parser, callback) {
	
	crawler.request(
		parser.url, 
		settings,
		function(error, $, body, parsedUrl, resp) {
			callback(parser.parser(parser.baseUrl, $));
		}
	);
}

var prothomParser = {
	baseUrl: "http://www.en.prothom-alo.com",
	url: "http://www.en.prothom-alo.com/bangladesh",
	parser: function (baseUrl, $) {
	
		var data = $(".each_news");
		
		var stories = [];
		var storyId = 0;
		data.each(function(article){
			
			var titleElement = $(this).find(".title");
			var title = titleElement.text().trim();
			var summary = $(this).find(".content").text().trim();
			
			var img = $(this).find(".image").find("img");
			var previewImg = "http:" + img.attr("src");
			
			var source = baseUrl + "/" + titleElement.find("a").attr("href");
			var body = "";
			var date = "";
			
			var story = model.createStory(
				storyId++, title, summary, body, date, source, previewImg);
			stories.push(story);
		});
		
		return stories;
	}
}
