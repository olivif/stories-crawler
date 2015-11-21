'use strict';

var should = require('should');

describe('test', function () {
  
  // testing the test framework
  it('should be able to assert 1+1', function (done) {
    var two = 1 + 1;
    two.should.equal(2);
    done();
  });
 
});