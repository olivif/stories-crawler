/**
* Test web crawler service
*/
var crawler = require("crawlerx");

var prothomParser = require("./parsers/prothom");

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
			callback(parser.parser($));
		}
	);
}