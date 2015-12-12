var crawler = require("crawlerx");

var settings = {decode: "utf-8", deep: 1, concurrency: 1};

module.exports = {
  crawlUrl: crawlUrl
};

function crawlUrl(url, callback) {

  crawler.request(
    url,
  settings,
		function(error, $, body, parsedUrl, resp) {
      callback($);
		}
	);
}
