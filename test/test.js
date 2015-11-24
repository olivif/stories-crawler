var should = require("should");
var assert = require("assert"); 
var request = require("supertest");  
var main = require("./../main");  
var model = require("./../lib/model");  
var prothom = require("./../lib/parsers/prothom");  

var jsdom = require('mocha-jsdom')

// Test suite for testing functionality
describe("testing", function () {
  
  // testing the test framework
  it("should be able to assert 1+1", function (done) {
    var two = 1 + 1;
    two.should.equal(2);
    done();
  });
  
});

// Test suite for models
describe("models", function () {
  
    describe("stories", function () {
      
        it("should create a story", function (done) {
          
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
          story.should.have.property('id', id);
          story.should.have.property('title', title);
          story.should.have.property('summary', summary);
          story.should.have.property('body', body);
          story.should.have.property('date', date);
          story.should.have.property('source', source);
          story.should.have.property('previewImg', previewImg);

          done();
        });
        
    });
  
});

// Test suite for parsers
describe("parsers", function () {
  
  describe("prothom", function () {

    var $
    jsdom()
  
    before(function () {
      $ = require('jquery')
    })
    
    var sampleStory = 
      "<div class=\"each_news mb20\">" + 
      "    <div class=\"oh mb10\">" + 
      "        <div class=\"content_right\">" + 
      "            <h3 class=\"subtitle\"><a href=\"news/86863/Jamaat-mulls-over-future\"></a></h3>" + 
      "            <h2 class=\"title\"><a href=\"news/86863/Jamaat-mulls-over-future\">Jamaat mulls over future</a></h2>" + 
      "            <div class=\"additional_info mb10\">" + 
      "                <span class=\"author\">Selim Zahid</span>" + 
      "                <span>02:44, Nov 24, 2015 </span>" + 
      "            </div>" + 
      "            <div class=\"content\">" + 
      "                <a href=\"news/86863/Jamaat-mulls-over-future\">Three top leaders of Jamaat-e-Islami have been executed. Party chief Matiur Rahman Nizami’s trial process is almost complete. The trials of certain other leaders are also nearing completion. The party is in the risk of bein banned. Jamaat is now worried about the its future plans and leadership. Sources in Jamaat said the party plans to follow a ‘go slow’ policy, in...</a>" + 
      "            </div>" + 
      "        </div>" + 
      "    </div>" + 
      "    <div class=\"bottom\">" + 
      "        <div class=\"holder\">" + 
      "            <a class=\"more_link\" href=\"news/86863/Jamaat-mulls-over-future\">Details</a>" + 
      "        </div>" + 
      "    </div>" + 
      "    <div class=\"content oh mb10\">" +
      "       <a href=\"news/86861/Country-getting-rid-of-war-crimes-curse-PM\" class=\"image image_left\">" +
      "         <img src=\"/contents/cache/images/200x150x1/uploads/media/2015/11/24/x192467f4ce4dd52fb26a09cb3e4b97a6-27.1.jpg,qjadewits_media_id=78011.pagespeed.ic.3Qek_TCmDg.jpg\" alt=\"Country getting rid of war crimes curse: PM\" pagespeed_url_hash=\"1706000961\">" +
      "       </a>" +
      "       <a class=\"content_right\" href=\"news/86861/Country-getting-rid-of-war-crimes-curse-PM\">Prime minister Sheikh Hasina on Monday said the country is gradually getting rid of the curse with the holding of trial and the execution of war...</a>" +
      "    </div>"
      "</div>";
  
      it("should return a valid story", function (done) {
    
        $("body").append(sampleStory);
        
        var stories = prothom.parser($);
        var story = stories[0];
        
        story.should.have.property("title", "Jamaat mulls over future");
        story.should.have.property("summary");
        story.should.have.property("body", null);
        story.should.have.property("date", null);
        story.should.have.property("source", "http://www.en.prothom-alo.com/news/86863/Jamaat-mulls-over-future");
        story.should.have.property("previewImg", "http://www.en.prothom-alo.com/contents/cache/images/200x150x1/uploads/media/2015/11/24/x192467f4ce4dd52fb26a09cb3e4b97a6-27.1.jpg");
            
        done();
      });
  });
  
});

// Test suite for crawler functionality
describe("crawler", function () {
  
});

// Test suite for api routing
describe("api", function () {

  var app;

  before(function() {
    // runs before all tests in this block
    app = main.setupApp();
  });

  after(function() {
    // runs after all tests in this block
  });
  
  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });
  
  it("should not have unknown page", function (done) {

    request(app)
      .get("/unknown")
      .expect(404, done); 
  });
  
  it("should return 500 on exception", function (done) {

    request(app)
      .get("/api/test")
      .expect(500, done);
  });
  
  it("should have an index", function (done) {

    request(app)
      .get("/")
      .expect(200, done); 
  });

  it("should have /api", function (done) {

    request(app)
      .get("/api")
      .expect(200, done); 
  });
  
});