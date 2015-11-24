var crawler = require("./crawler");

var prothomParser = require("./parsers/prothom");

module.exports = {
  getStories: getStories
};

function getStories(callback) {
	
	crawler.crawlUrl(prothomParser.url, function(pageData) {
		var stories = prothomParser.parser(pageData);
		callback(stories);
	});
}