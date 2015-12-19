var should = require("should");
var request = require("supertest");
var sinon = require('sinon');

var main = require("./../main");

var storyProvider = require("./../lib/storyProvider");

// Test suite for api routing
describe("api", function() {

  var app;
  
  before(function() {
    app = main.setupApp();
  });

  it("should not have unknown page", function(done) {

    request(app)
      .get("/unknown")
      .expect(404, done);
  });

  it("should return 500 on exception with stack trace", function(done) {

    process.env.NODE_ENV = 'development';
    app = main.setupApp();
  
    request(app)
      .get("/api/test")
      .set('Accept', 'application/json')
      .expect(function(response){
        var stackTraceTokenPos = response.text.indexOf("StackTrace");
        stackTraceTokenPos.should.not.be.equal(-1);
      })
      .expect(500, done);
  });

  it("should return 500 on exception with no stack trace in prod", function(done) {

    process.env.NODE_ENV = 'production';
    app = main.setupApp();

    request(app)
      .get("/api/test")
      .expect(function(response){
        var stackTraceTokenPos = response.text.indexOf("StackTrace");
        stackTraceTokenPos.should.be.equal(-1);
      })
      .expect(500, done);
  });
  
  it("should have /api", function(done) {

    request(app)
      .get("/api")
      .expect(200, done);
  });

  it("should return data on /api/stories", function(done) {

    this.timeout(10000);
    process.env.MAX_STORIES = 2;

    request(app)
      .get("/api/stories")
      .expect(200)
      .end(function(error, result) {
        should.not.exist(error);
        result.should.not.be.null;
        result.body.should.not.be.null;
        result.body.stories.should.not.be.null;
        result.body.stories.should.be.array;
        result.body.stories.length.should.be.above(0);
        done();
      });
  });
  
});