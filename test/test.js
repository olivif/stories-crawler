var should = require("should");
var assert = require("assert");
var request = require("supertest");
var main = require("./../main");
var model = require("./../lib/model");

// Test suite for testing functionality
describe("testing", function() {

  // testing the test framework
  it("should be able to assert 1+1", function(done) {
    var two = 1 + 1;
    two.should.equal(2);
    done();
  });

});

// Test suite for models
describe("models", function() {

  describe("stories", function() {

    it("should create a story", function(done) {

      var id = 2;
      var title = "Olivia Node.js Queen";
      var summary = "Common give me the summary";
      var body = "The full article";
      var date = Date.now();
      var source = "http://google.com";
      var previewImg = "http://previewUrl";
      var story = model.createStory(
        id, title, summary, body, date, source, previewImg
      );

      // todo add a schema class so we can validate easier
      story.should.have.property("id", id);
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