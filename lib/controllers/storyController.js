var storyController = function(Story, Event, StoryProvider) {
  
  function refreshStories(callback) {
    
    StoryProvider.getStories(function(stories){
      console.log("Refreshinng stories");
    
      // clear the old stories here
      Story.remove().exec();
      
      stories.forEach(function(story){
        var newStory = new Story(story);
        newStory.save();
        console.log("Saving new story");
      });
      
      // Let's also update the db with LastUpdated
      var newEvent = new Event();
      newEvent.type = "LastUpdated";
      newEvent.date = new Date();
      
      newEvent.save();
      
      callback();
    });
  }

  var sendStories = function(response, callback) {
    
    console.log("sending stories");
    
    // At this point we should have fresh data in the db if needed
    Story.find(function(error, stories) {
      if (error) {
        console.log(error); 
      } else {
        response.status(200);
        console.log("stories sent = " + stories.length);
        console.log("stories = " + stories);
        response.json(stories);
      }
      
      if (callback !== null) {
        callback();
      }
    });
  }

  var get = function(request, response, next) {
  
    // Check for last time we updated
    // If we should update, clear the db and add new content. 
    // Then fetch it and pass it on.
    Event.findOne({ "type": "LastUpdated" }, function(error, event) {
      
      if (error) {
        console.log("got error: " + error);
      } else {
        
        if (event === null) {
          console.log("didn find a last updated event");
          // It is the first time we are running this, so let's just update if that is the case
          refreshStories(function() { 
            sendStories(response, next);
            });
        } else {
          console.log("found last updated event ");
          
          // Figure out how long it's been since now and then
          var freshnessInMS = (new Date()) - event.date;
          var freshnessInDays = 24 - freshnessInMS / 1000 / 60 / 60;
          console.log("freshnessInDays = " + freshnessInDays);
          
          if (freshnessInDays <= 0) {
            // We need to update again
            refreshStories(function() { 
              sendStories(response, next);
              });
            } else {
              sendStories(response, next);
            }
        }
      }    
    });
  }

    return {
        refreshStories: refreshStories,
        get: get
    }
    
}

module.exports = storyController;