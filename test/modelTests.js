var should = require("should");
var request = require("supertest");
var main = require("./../main");

var Story = require("./../lib/models/story");
var Event = require("./../lib/models/event");

// Test suite for models
describe("models", function() {
  
  function assertSaveSuccess(instance, propertyKey, propertyValue, done) {
    instance[propertyKey] = propertyValue;
    instance.save(function(validationError){
      should.not.exist(validationError);
      done();        
    });
  }
  
  function assertSaveError(instance, propertyKey, propertyValue, done) {
    instance[propertyKey] = propertyValue;
    instance.save(function(validationError){
      should.exist(validationError);
      console.log("validationError " + validationError);
      var message = validationError.errors[propertyKey].message;
      console.log(message);
      message.should.eql("Invalid " + propertyKey);
      done();        
    });
  }  
  
  describe("stories", function() {

    var title = "Olivia Node.js Queen";
    var summary = "Common give me the summary";
    var body = "The full article";
    var date = new Date();
    var source = "http://google.com";
    var previewImg = "http://previewUrl";
    var story;

    beforeEach(function(done) {
      story = Story.createInstance(title, summary, body, date, source, previewImg);
      done();
    });
    
    afterEach(function(done){
      Story.remove().exec();
      done();
    })
    
    it("should create a story with all valid fields", function(done) {

      story.should.have.property("title", title);
      story.should.have.property("summary", summary);
      story.should.have.property("body", body);
      story.should.have.property("date", date);
      story.should.have.property("source", source);
      story.should.have.property("previewImg", previewImg);

      done();
    });

    it("should not create a story without title", function(done) {
      assertSaveError(story, "title", null, done);
    });

    it("should not create a story without summary", function(done) {
      assertSaveError(story,"summary", null, done);
    });

    it("should not create a story without date", function(done) {
      assertSaveError(story, "date", null, done);
    });

    it("should not create a story without source", function(done) {
      assertSaveError(story, "source", null, done);
    });

  });
  
  describe("events", function() {
    
    var type = "LastUpdated";
    var date = new Date();
    var event;
    
    beforeEach(function(done) {
      event = Event.createInstance(type, date);
      done();
    });
    
    afterEach(function(done){
      Event.remove().exec();
      done();
    })

    it("should create an event with all valid fields", function(done) {
  
      event.should.have.property("type", type);
      event.should.have.property("date", date);
      
      done();
    });
    
    it("should not create an event without type", function(done) {
      assertSaveError(event, "type", null, done);
    });

    it("should not create an event without date", function(done) {
      assertSaveError(event, "date", null, done);
    });

    it("should not create an event of type LastUpdated", function(done) {
      assertSaveSuccess(event, "type", "LastUpdated", done);
    });

    it("should not create an event with an unsupported type", function(done) {
      assertSaveError(event, "type", "UnsupportedEventType", done);
    });

    it("should not create an event with a future date", function(done) {
      var futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 10);
      console.log(futureDate.toString());
      
      assertSaveError(event, "date", futureDate, done);
    });
    
  });

});