var storyProvider = require("./../lib/storyProvider");

var express = require("express");
var mongoose = require('mongoose');

var router = express.Router();

var Story = require("./../lib/models/story");

router.get("/", function(request, response, next) {
  response.send("Api is running.");
});

router.get("/test", function(request, response, next) {
  throw "exception";
});

router.get("/stories", function(request, response, next) {

  Story.find(function(error, stories) {
    if (error) {
      console.log(error);
    } else {
      response.json(stories);
    }
  });
});

router.post("/stories", function(request, response, next) {
  var story = new Story(request.body);
  story.save();
  
  response.status(201).send(story);
});


module.exports = router;
