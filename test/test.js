"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

describe('Node Capstone app', function(){

    before(function(){
        return runServer();
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