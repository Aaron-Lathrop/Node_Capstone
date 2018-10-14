"use strict";

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const {app, runServer, closeServer, server} = require('../server');
const {User, Interview} = require('../users')
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);



function tearDownDb() {
    return new Promise((resolve, reject) => {
      console.warn('Deleting database');
      mongoose.connection.dropDatabase()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

describe('Node Capstone app', function(){
    const username = 'exampleUser';
    const password = 'examplePass';
    const firstName = 'Example';
    const lastName = 'User';
    const usernameB = 'exampleUserB';
    const passwordB = 'examplePassB';
    const firstNameB = 'ExampleB';
    const lastNameB = 'UserB';

    before(function(){
        return runServer(TEST_DATABASE_URL);
    });

    afterEach(function() {
        return tearDownDb();
    })

    after(function() {
        console.log(server);

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

    // it('should GET one user',function(){
    //     return chai
    //     .request(app)
    //     .post('/users')
    //     .send({
    //         password,
    //         firstName,
    //         lastName,
    //         username
    //     })
    //     .then(() =>
    //         expect(res).to.have.status(201)
    //     )
    //     .catch(err => {
    //         if(err instanceof chai.AssertionError){
    //             throw err;
    //         }
    //     });
        // .then(() => {
        //     chai.request(app)
        //     .get(`/users/${username}`)
        // })
    // });

    

});//describe Node Capstone app