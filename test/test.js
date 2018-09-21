"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');


chai.use(chaiHttp);

describe('Node Capstone app', function(){

    before(function(){
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    it('should show the app is online', function(){
        return chai.request(app)
            .get('/')
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.html;
            });
    });//it should show the app is online

    

});//describe Node Capstone app