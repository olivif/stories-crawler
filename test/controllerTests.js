var storyProvider = require("./../lib/storyProvider");
var crawler = require("./../lib/crawler");
var prothom = require("./../lib/parsers/prothom");
var fs = require("fs");
var jsdom = require("mocha-jsdom");
var sinon = require("sinon");
var clock = sinon.useFakeTimers();

var main = require("./../main");

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyProvider = require("./../lib/storyProvider");

var storyControllerFactory = require("./../lib/controllers/storyController");

var app; 

// Test suite for story controller
describe("story controller", function() {
  
  this.timeout(10000);

  afterEach(function(done){
    Story.remove().exec();
    Event.remove().exec();

    done();
  })
    
  function generateFakeStories(Story, n) {
    
    var stories = [];
    
    for (var index = 0; index < n; index++) {
      var story = new Story();
      story.title = "Fake story " + index;
      
      stories.push(story);
    }
    
    return stories;
  }
  
  it("should refresh stories when there is no LastUpdated event", function(done) {
      
      // Make sure there are no LastUpdated events in the db
      // Event.remove().exec();
      var storyProvider = {
        getStories: function(callback) {
          console.log("Getting fake stories");
          callback(generateFakeStories(Story, 2));
        }
      }
      var storyController = storyControllerFactory(Story, Event, storyProvider);
      
      sinon.spy(storyController, "refreshStories");
      
      // Call get and make sure we have *any* stories
      var request = {};
      
      var response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      
      var next = function() {
        console.log("I got called");  

        response.status.calledWith(200).should.equal(true);
        response.json.should.be.array;
        
        storyController.refreshStories.notCalled;
  
        done();
      }
      
      storyController.get(request, response, next);
  });

  xit("should refresh stories if LastUpdated is too long ago", function(done) {
      done();
  });
  
  xit("should just fetch stories if LastUpdated is too long ago", function(done) {
      done();
  });
  
  xit("should clear old stories on refresh", function(done) {
      done();
  });
  
});