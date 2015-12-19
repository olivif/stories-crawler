var storyController = function(Story, Event, StoryProvider) {
  
  function refreshStories(callback) {
    
    StoryProvider.getStories(function(stories){
      console.log("Refreshing stories");
    
      // clear the old stories here
      Story.remove().exec();
      
      console.log("Saving all " + stories.length + " stories");
      Story.create(stories, function(error, savedStories) {
        if (error) {
          console.log("Failed to save new stories; MongoError = " + error);          
        } else {
          var newEvent = Event.createLastUpdated();
          newEvent.save();
        }
        
        callback();
      })
    });
  }

  var sendStories = function(response, callback) {
    
    console.log("sending stories");
    
    // At this point we should have fresh data in the db if needed
    Story.find(function(error, stories) {
      if (error) {
        console.log("Failed to retrieve stories from db; MongoError = " + error);          
        response.status(200);
        response.json({ stories: [] });
      } else {
        response.status(200);
        console.log("stories sent = " + stories.length);
        response.json({ stories: stories });
      }
      
      if (callback !== null) {
        callback();
      }
    });
  }

  function shouldRefresh(lastUpdatedEvent) {
    var maxFreshnessAllowed = 24;
    var freshnessInMS = (new Date()) - lastUpdatedEvent.date;
    var freshnessInHours = freshnessInMS / 1000 / 60 / 60;
    
    console.log("Freshness in hours is " + freshnessInHours);
    return freshnessInHours >= maxFreshnessAllowed; 
  }
  
  var get = function(request, response, next) {
  
    Event.findOne({ "type": "LastUpdated" }, function(error, event) {
      
      if (error) {
        console.log("Couldn't find LastUpdated event, just retrieving stories from db; MongoError = " + error);
        sendStories(response, next);
      } else {
        if (event === null) {
          console.log("Could get events from db, but no LastUpdated event found, refreshing stories");
          refreshStories(function() { sendStories(response, next);});
        } else {
          console.log("Could get events from db, and found LastUpdated event");
          
          if (shouldRefresh(event)) {
            refreshStories(function() { sendStories(response, next); });
          } else {
            sendStories(response, next);
          }
        }
      }    
    });
  }

    return {
        refreshStories: refreshStories,
        sendStories: sendStories,
        get: get
    }
    
}

module.exports = storyController;