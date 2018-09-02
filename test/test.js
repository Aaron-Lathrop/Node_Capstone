"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const {app} = require('../server');

chai.use(chaiHttp);

describe('Node Capstone app', function(){
    it('should show the app is online', function(){
        return chai.request(app)
            .listen(process.env.PORT || 8080)
            .then(function(res){
                expect(res).to.have.status(200);
            });//then(function(res))
    });//it should show the app is online

});//describe Node Capstone app