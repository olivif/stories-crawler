var crawler = require("./crawler");

var prothomParser = require("./parsers/prothom");

module.exports = {
  getStories: getStories
};

// todo this needs a bit of work to support multiple parsers
function getStories(callback) {

  crawler.crawlUrl(prothomParser, function(parserData) {
    callback(parserData);
  }, function() {
    callback([]);
  });
  
}
