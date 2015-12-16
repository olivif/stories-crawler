var router = require("express").Router();

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyProvider = require("./../lib/storyProvider");

var storyController = require("./../lib/controllers/storyController")(Story, Event, storyProvider);

/**
 * @api {get} /api 
 * @apiName apiIndex
 * @apiGroup api
 *
 * @apiSuccess {String} Api is running.
 */
router.get("/", function(request, response, next) {
  response.send("Api is running.");
});

/**
 * @api {get} /api/test 
 * @apiName apiTest
 * @apiGroup api
 *
 * @apiError UnexpectedException
 */
router.get("/test", function(request, response, next) {
  throw "UnexpectedException";
});

/**
 * @api {get} /api/stories 
 * @apiName apiStories
 * @apiGroup api
 *
 * @apiSuccess {String} Api is running.
 */
router.get("/stories", function(request, response, next) {
  storyController.get(request, response, null);
});

module.exports = router;
