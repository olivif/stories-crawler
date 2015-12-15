var router = require("express").Router();

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyProvider = require("./../lib/storyProvider");

var storyController = require("./../lib/controllers/storyController")(Story, Event, storyProvider);

router.get("/", function(request, response, next) {
  response.send("Api is running.");
});

router.get("/test", function(request, response, next) {
  throw "exception";
});

router.get("/stories", function(request, response, next) {
  storyController.get(request, response, null);
});

module.exports = router;
