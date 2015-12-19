var crawler = require("./crawler");
var Q = require("q");

var prothomParser = require("./parsers/prothom");
var maxStories = -1;

module.exports = {
  getStories: getStories,
  getMaxStories: getMaxStories
};

function getMaxStories() {
  var max = process.env.MAX_STORIES;
  console.log(" = " + max)
  if (isNaN(max)) {
    return -1;
  }
  return max;
}

function crawlSync (parser) {
  var deferred = Q.defer()
  crawler.crawlUrl(parser, function (data, error) {
    if (error) deferred.reject(error) // rejects the promise with `er` as the reason
    else deferred.resolve(data) // fulfills the promise with `data` as the value
  })
  return deferred.promise // the promise is returned
}

function runAdditionalParser2(stories) {
  
  var promises = [];
  stories.forEach(function(story) {
    var prothomContentParser = require("./parsers/prothom-content")(story.source, story);
    promises.push(crawlSync(prothomContentParser, story));
  }, this);
  console.log("got " + promises.length + " promises");
  return Q.all(promises);
}

// todo this needs a bit of work to support multiple parsers
function getStories(callback) {

  crawler.crawlUrl(prothomParser, function(stories) {

    var storiesToSlice = 0;
    var max = getMaxStories();
    if (max !== -1) {
      storiesToSlice = Math.max(stories.length - max, 0);
    }
    
    console.log("Got " + stories.length + ", slicing to " + storiesToSlice);
    stories = stories.slice(storiesToSlice);
    console.log("New stories length = " + stories.length);
    
    runAdditionalParser2(stories)
    .then(function(updatedStories) { 
      console.log("got updated stories " + updatedStories.length);
      callback(updatedStories); 
    });
  });
}
