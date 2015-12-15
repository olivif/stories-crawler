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
        response.json.should.be.array;
        
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
        response.json.should.be.array;
        
        storyController.refreshStories.calledOnce;
  
        done();
      }
      
      storyController.get(request, response, next);
  });
  
  xit("should just fetch stories if LastUpdated is too long ago", function(done) {
      done();
  });
  
  xit("should clear old stories on refresh", function(done) {
      done();
  });
  
});