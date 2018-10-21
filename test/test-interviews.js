'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {Interview} = require('../interviews');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');



const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('/interview', function(){
    before(function() {
        return runServer(TEST_DATABASE_URL);
      });
    
      after(function() {
        return closeServer();
      });
    
      beforeEach(function() {});
    
      afterEach(function() {
        return User.remove({});
      });
});