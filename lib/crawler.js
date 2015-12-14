var crawler = require("crawlerx");

var settings = {decode: "utf-8", deep: 1, concurrency: 1};

module.exports = {
  crawlUrl: crawlUrl
};

function crawlUrl(parser, callback) {
  
  crawler.request(
    parser.url,
    settings,
    function(error, $, body, parsedUrl, resp) {
      var parserData = parser.parser($);
      callback(parserData);
    }
  );
}

  