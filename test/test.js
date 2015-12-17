var should = require("should");
var assert = require("assert");
var request = require("supertest");
var main = require("./../main");

var Story = require("./../lib/models/story");

// Test suite for models
describe("models", function() {

  describe("stories", function() {

    it("should create a story", function(done) {

      var title = "Olivia Node.js Queen";
      var summary = "Common give me the summary";
      var body = "The full article";
      var date = new Date();
      var source = "http://google.com";
      var previewImg = "http://previewUrl";
      
      var story = new Story();
      story.title = title;
      story.summary = summary;
      story.body = body;
      story.date = date;
      story.source = source;
      story.previewImg = previewImg;

      story.should.have.property("title", title);
      story.should.have.property("summary", summary);
      story.should.have.property("body", body);
      story.should.have.property("date", date);
      story.should.have.property("source", source);
      story.should.have.property("previewImg", previewImg);

      done();
    });

  });

});