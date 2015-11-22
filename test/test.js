var should = require("should");
var assert = require("assert"); 
var request = require("supertest");  
var main = require("./../main");  

// Test suite for testing functionality
describe("testing", function () {
  
  // testing the test framework
  it("should be able to assert 1+1", function (done) {
    var two = 1 + 1;
    two.should.equal(2);
    done();
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
  
  it("should have an index", function (done) {

    request(app)
      .get("/")
      .set('Accept', 'application/json') 
      .expect(200, done); 
  });

  it("should have /api", function (done) {

    request(app)
      .get("/api")
      .expect(200, done); 
  });
  
});