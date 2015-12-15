var crawler = require("crawlerx");

var settings = {decode: "utf-8", deep: 1, concurrency: 1};

module.exports = {
  crawlUrl: crawlUrl
};

function crawlUrl(parser, callback) {
  
  console.log("crawling url " + parser.url);
  
  crawler.request(
    parser.url,
    settings,
    function(error, $, body, parsedUrl, resp) {
      console.log("got data for url " + parser.url);

      var parserData = parser.parser($);
      callback(parserData);
    }
  );
}

  