var storyProvider = require("./../lib/storyProvider");
var crawler = require("./../lib/crawler");
var prothom = require("./../lib/parsers/prothom");
var fs = require('fs');
var jsdom = require("mocha-jsdom");

// Test suite for parsing static content taken from the real websites
describe("parsers", function() {

  describe("prothom parser", function() {

    var $;
    jsdom();

    before(function() {
      $ = require("jquery");
    });

    var sampleStory = fs.readFileSync('test/data/prothom.txt').toString();

    it("should return a valid story", function(done) {

      $("body").append(sampleStory);

      var stories = prothom.parser($);
      var story = stories[0];

      story.should.have.property("title", "Jamaat mulls over future");
      story.should.have.property("summary");
      story.should.have.property("body", null);
      story.should.have.property("source", "http://www.en.prothom-alo.com/news/86863/Jamaat-mulls-over-future");
      story.should.have.property("previewImg", "http://www.en.prothom-alo.com/contents/cache/images/200x150x1/uploads/media/2015/11/24/x192467f4ce4dd52fb26a09cb3e4b97a6-27.1.jpg");

      done();
    });
  });

});

// Test suite for crawler integration which pulls real data
describe("crawler", function() {

  // These tests actually pull data from the website,
  // so we need to increase the timeout. 
  this.timeout(10000);

  it("should return valid stories from prothom", function(done) {
  
    crawler.crawlUrl(prothom, function(stories){
      
      console.log("calling test callback");
      
      // Assert we got some stories
      stories.should.be.array;
      stories.should.not.be.empty;
      
      // Now assert they contain what we want
      stories.forEach(function(story) {
        story.should.have.property("title").should.not.be.null;
        story.should.have.property("summary").should.not.be.null;
        story.should.have.property("previewImg").should.not.be.null;
        story.should.have.property("source").should.not.be.null;
      }, this);
      
      done();
    });
  });
  
});

// Test suite for story provider
describe("story provider", function() {
  
  this.timeout(20000);
  
  it("should get stories from all parsers", function(done) {
  
    storyProvider.getStories(function(stories){
      stories.should.be.array;
      stories.should.not.be.empty;
      
      done();
    });
    
  });

});
  