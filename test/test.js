var should = require('should');
var assert = require('assert'); 
var request = require('supertest');  

// Test suite for testing functionality
describe('testing', function () {
  
  // testing the test framework
  it('should be able to assert 1+1', function (done) {
    var two = 1 + 1;
    two.should.equal(2);
    done();
  });
  
});

// Test suite for crawler functionality
describe('crawler', function () {
  
});

// Test suite for api routing
describe('api', function () {
  
});