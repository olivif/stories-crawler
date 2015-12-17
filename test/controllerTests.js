var sinon = require("sinon");

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

var storyProvider = require("./../lib/storyProvider");

var storyControllerFactory = require("./../lib/controllers/storyController");

// Test suite for story controller
describe("story controller tests", function() {
  
  var storyProvider;
  var storyController;
  var request;
  var response;
  
  beforeEach( function(done) {
    
    storyProvider = {
        getStories: function(callback) {
          callback(generateFakeStories(Story, 2));
        }
      }
    
    storyController = storyControllerFactory(Story, Event, storyProvider);
    sinon.spy(storyController, "refreshStories");
    
    request = {};
      
    response = {
      status: sinon.spy(),
      send: sinon.spy(),
      json: sinon.spy()
    };

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
      var story = Story.createInstance("Fake story " + index, "Fake summary", "Fake body", new Date(), "http://fakesource", "http://fakeimgurl");
      stories.push(story);
    }
    
    return stories;
  }
  
  function createLastUpdatedEvent(hoursOffset) {
    
      var newEvent = new Event();
      newEvent.type = "LastUpdated";
      
      var lastUpdated = new Date();
      lastUpdated.setHours(lastUpdated.getHours() - hoursOffset);
      newEvent.date = lastUpdated;
      
      newEvent.save();
  }
  
  it("should refresh stories when there is no LastUpdated event", function(done) {
      
      var next = function() {

        response.status.calledWith(200).should.equal(true);
        
        storyController.refreshStories.notCalled;
  
        done();
      }
      
      storyController.get(request, response, next);
  });

  it("should refresh stories if LastUpdated is too long ago", function(done) {
    
      createLastUpdatedEvent(25);
      
      var next = function() {

        response.status.calledWith(200).should.equal(true);
        
        storyController.refreshStories.calledOnce;
  
        done();
      }
      
      storyController.get(request, response, next);
  });
  
  it("should just fetch stories if LastUpdated is too long ago", function(done) {
    
      createLastUpdatedEvent(2);
      
      var next = function() {

        response.status.calledWith(200).should.equal(true);
        
        storyController.refreshStories.notCalled;
  
        done();
      }
      
      storyController.get(request, response, next);
  });
  
  it("should clear old stories on refresh", function(done) {
    
      createLastUpdatedEvent(25);

      var next = function() {

        response.status.calledWith(200).should.equal(true);
        
        storyController.refreshStories.calledOnce;

        response.json.getCall(0).args[0].stories.length.should.equal(2);
        
        // Now we clear the event and force another refresh
        Event.remove().exec();

        var nextNext = function() {
          
          response.status.calledWith(200).should.equal(true);
          
          storyController.refreshStories.calledOnce;
  
          response.json.getCall(1).args[0].stories.length.should.equal(2);
          
          done();
        };
               
        storyController.get(request, response, nextNext);
      }
      
      storyController.get(request, response, next);
  });
});