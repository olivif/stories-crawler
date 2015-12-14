var should = require("should");
var assert = require("assert");
var request = require("supertest");
var db = require('mongoose');

var main = require("./../main");

// Test suite for api routing
describe("api", function() {

  var app;

  // runs before all tests in this block
  before(function() {
    app = main.setupApp();
  });

  // runs after all tests in this block
  after(function() {
    main.disconnectFromDb();
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
  
  it("should have an index", function(done) {

    request(app)
      .get("/")
      .expect(200, done);
  });

  it("should have /api", function(done) {

    request(app)
      .get("/api")
      .expect(200, done);
  });

});