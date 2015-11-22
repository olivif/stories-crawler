/**
* Test web crawler service
*/
var model = require("./model");
var crawler = require("crawlerx");

module.exports = {
  getStoriesFromCrawler: getStoriesFromCrawler
};

function getStoriesFromCrawler(callback) {
	
	var url = "http://bdnews24.com/";
	var settings = { decode:"utf-8", deep:1, concurrency:1 };

	crawler.request(
		url, 
		settings,
		function(error, $, body, url, resp) {
	
			// find data
			var data = $(".mostRead").find(".article").find("a");
			
			// create story object for each
			var stories = [];
			var storyId = 0;
			data.each(function(aElement){
				var aElementText = $(this).text();
				var story = model.createStory(storyId++, aElementText);
				stories.push(story);
			});
			
			// callback with the stories data
			callback(stories);
		}
	);
}