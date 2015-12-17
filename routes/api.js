var router = require("express").Router();

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyProvider = require("./../lib/storyProvider");

var storyController = require("./../lib/controllers/storyController")(Story, Event, storyProvider);

/**
 * @api {get} /api Request API heatbeat
 * @apiName GetHeatbeat
 * @apiGroup API
 * 
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {String} message Api is running
 * @apiSuccessExample {json} Success-Response:
 * { 
 *    "message": "Api is running" 
 * }
 */
function getApiIndex(request, response, next) {
  response.send( { message: "Api is running." } );
}

function getApiTest(request, response, next) {
  throw "InternalServerError";
}

/**
 * @api {get} /api/stories Request list of stories
 * @apiName GetStories
 * @apiGroup Stories
 * 
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Story[]} stories List of stories
 * @apiSuccessExample {json} Success-Response:
{
  "stories": [
    {
      "_id": "5672db59495ede3ebc4ea8df",
      "title": "Brazil WhatsApp suspension lifted",
      "summary": "A judge in Brazil has ordered that a suspension of the popular messaging application WhatsApp be lifted.
                  Judge Xavier de Souza said the service should be re-instated immediately.
                  WhatsApp had been suspended for 48 hours on Thursday after the company failed to comply with a court order to provide investigators with information relating to a criminal court case.",
      "body": null,
      "date": null,
      "source": "http://www.bbc.com/news/world-latin-america-35125559",
      "previewImg": "http://ichef.bbci.co.uk/news/660/cpsprodpb/2BA3/production/_86817111_breaking_image_large-3.png",
      "__v": 0
    },
    ....
    ]
}
 */
function getApiStories(request, response, next) {
  storyController.get(request, response, null);
}

router.get("/", getApiIndex);
router.get("/test", getApiTest);
router.get("/stories", getApiStories);

module.exports = router;
