var should = require("should");
var assert = require("assert");
var request = require("supertest");
var main = require("./../main");

var Story = require("./../lib/models/story");

// Test suite for models
describe("models", function() {

  var title = "Olivia Node.js Queen";
  var summary = "Common give me the summary";
  var body = "The full article";
  var date = new Date();
  var source = "http://google.com";
  var previewImg = "http://previewUrl";
  
  function createValidStory() {
      
      var story = new Story();
      story.title = title;
      story.summary = summary;
      story.body = body;
      story.date = date;
      story.source = source;
      story.previewImg = previewImg;

      return story;    
  }

  function checkRequiredProperty(property, done) {
    
    var story = createValidStory();
    story[property] = null;
    
    story.save(function(validationError){
      
      var message = validationError.errors[property].message;
      console.log("validation message = " + message);
      message.should.eql("Invalid " + property);
      
      done();        
    });
  }  
  
  describe("stories", function() {

    it("should create a story with all valid fields", function(done) {

      var story = createValidStory();
      
      story.should.have.property("title", title);
      story.should.have.property("summary", summary);
      story.should.have.property("body", body);
      story.should.have.property("date", date);
      story.should.have.property("source", source);
      story.should.have.property("previewImg", previewImg);

      done();
    });

    it("should not create a story without title", function(done) {
      checkRequiredProperty("title", done);
    });

    it("should not create a story without summary", function(done) {
      checkRequiredProperty("summary", done);
    });

    it("should not create a story without date", function(done) {
      checkRequiredProperty("date", done);
    });

    it("should not create a story without source", function(done) {
      checkRequiredProperty("source", done);
    });

  });

});