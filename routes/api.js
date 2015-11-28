var storyProvider = require("./../lib/storyProvider");

var express = require("express");
var router = express.Router();

router.get("/", function(request, response, next) {
  response.send("Api is running.");
});

router.get("/test", function(request, response, next) {
  throw "exception";
});

router.get("/stories", function(request, response, next) {

  // get stories from crawler
  var storiesCallback = function(stories) {
    var data = {stories: stories};
    response.send(data);
  };

  storyProvider.getStories(storiesCallback);
});

module.exports = router;
