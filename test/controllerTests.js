var sinon = require("sinon");

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyProvider = require("./../lib/storyProvider");

var storyControllerFactory = require("./../lib/controllers/storyController");

// Test suite for story controller
describe("story controller tests", function() {
  
  var storyProvider;
  var storyController;

  beforeEach(function(done){
    storyProvider = {
        getStories: function(callback) {
          console.log("Getting fake stories");
          callback(generateFakeStories(Story, 2));
        }
      }
    
    storyController = storyControllerFactory(Story, Event, storyProvider);
      
    done();
  })
        
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
        // response.json.should.be.array;
        // console.log("response.json = " + response.json);
        
        storyController.refreshStories.notCalled;
  
        done();
      }
      
      storyController.get(request, response, next);
  });

  it("should refresh stories if LastUpdated is too long ago", function(done) {
    
      // Create a last updated event and save it
      var newEvent = new Event();
      newEvent.type = "LastUpdated";
      
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      newEvent.date = yesterday;
      
      newEvent.save();
      
      sinon.spy(storyController, "refreshStories");
      
      var request = {};
      
      var response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      
      var next = function() {
        console.log("I got called");  

        response.status.calledWith(200).should.equal(true);
        
        storyController.refreshStories.calledOnce;
  
        done();
      }
      
      storyController.get(request, response, next);
  });
  
  it("should just fetch stories if LastUpdated is too long ago", function(done) {
    var newEvent = new Event();
      newEvent.type = "LastUpdated";
      
      var lastUpdated = new Date();
      lastUpdated.setHours(lastUpdated.getHours() - 2);
      newEvent.date = lastUpdated;
      
      newEvent.save();
      
      sinon.spy(storyController, "refreshStories");
      
      var request = {};
      
      var response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      
      var next = function() {
        console.log("I got called");  

        response.status.calledWith(200).should.equal(true);
        // response.json.should.be.array;
        
        storyController.refreshStories.notCalled;
  
        done();
      }
      
      storyController.get(request, response, next);
  });
  
  it("should clear old stories on refresh", function(done) {
    
      // Create a last updated event and save it
      var newEvent = new Event();
      newEvent.type = "LastUpdated";
      
      var yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      newEvent.date = yesterday;
      
      newEvent.save();
      
      sinon.spy(storyController, "refreshStories");
      
      var request = {};
      
      var response = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };
      
      var next = function() {
        console.log("I got called");  

        response.status.calledWith(200).should.equal(true);
        
        storyController.refreshStories.calledOnce;

        response.json.getCall(0).args[0].length.should.equal(2);
        
        // Now we clear the event and force another refresh
        Event.remove().exec();

        var nextNext = function() {
          console.log("I got called -next next");  
          
          response.status.calledWith(200).should.equal(true);
          
          storyController.refreshStories.calledOnce;
  
          response.json.getCall(1).args[0].length.should.equal(2);
          
          done();
        };
               
        storyController.get(request, response, nextNext);
      }
      
      storyController.get(request, response, next);
  });
  
});