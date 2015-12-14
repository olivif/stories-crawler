var should = require("should");
var assert = require("assert");
var request = require("supertest");
var main = require("./../main");
var db = require('mongoose');

// Test suite for api routing
describe("api", function() {

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

  it("should not have unknown page", function(done) {

    request(app)
      .get("/unknown")
      .expect(404, done);
  });

  it("should return 500 on exception", function(done) {

    request(app)
      .get("/api/test")
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