var router = require("express").Router();

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyController = require("./../lib/controllers/storyController");

router.get("/", function(request, response, next) {
  response.send("Api is running.");
});

router.get("/test", function(request, response, next) {
  throw "exception";
});

router.get("/stories", storyController.get);

module.exports = router;
