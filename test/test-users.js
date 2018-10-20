'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users');
const {Interview} = require('../interviews');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');



const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('/users', function() {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const usernameB = 'exampleUserB';
  const passwordB = 'examplePassB';
  const firstNameB = 'ExampleB';
  const lastNameB = 'UserB';

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

  describe('/users', function() {
    describe('POST', function() {
      it('Should reject users with missing username', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            password,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with missing password', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal('Missing field');
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string username', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username: 1234,
            password,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-string password', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password: 1234,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with non-string first name', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password,
            firstName: 1234,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('firstName');
          });
      });
      it('Should reject users with non-string last name', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password,
            firstName,
            lastName: 1234
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Incorrect field type: expected string'
            );
            expect(res.body.location).to.equal('lastName');
          });
      });
      it('Should reject users with non-trimmed username', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username: ` ${username} `,
            password,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with non-trimmed password', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password: ` ${password} `,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Cannot start or end with whitespace'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with empty username', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username: '',
            password,
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 1 characters long'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should reject users with password less than ten characters', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password: '123456789',
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at least 10 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with password greater than 72 characters', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password: new Array(73).fill('a').join(''),
            firstName,
            lastName
          })
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Must be at most 72 characters long'
            );
            expect(res.body.location).to.equal('password');
          });
      });
      it('Should reject users with duplicate username', function() {
        // Create an initial user
        return User.create({
          username,
          password,
          firstName,
          lastName
        })
          .then(() =>
            // Try to create a second user with the same username
            chai.request(app).post('/users').send({
              username,
              password,
              firstName,
              lastName
            })
          )
          // .then(() =>
          //   expect.fail(null, null, 'Request should not succeed')
          // )
          .catch(err => {
            if (err instanceof chai.AssertionError) {
              throw err;
            }

            const res = err.response;
            expect(res).to.have.status(422);
            expect(res.body.reason).to.equal('ValidationError');
            expect(res.body.message).to.equal(
              'Username already taken'
            );
            expect(res.body.location).to.equal('username');
          });
      });
      it('Should create a new user', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password,
            firstName,
            lastName
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'firstName',
              'lastName',
              'id'
            );
            expect(res.body.username).to.equal(username);
            expect(res.body.firstName).to.equal(firstName);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            return user.validatePassword(password);
          })
          .then(passwordIsCorrect => {
            expect(passwordIsCorrect).to.be.true;
          });
      });
      it('Should trim firstName and lastName', function() {
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password,
            firstName: ` ${firstName} `,
            lastName: ` ${lastName} `
          })
          .then(res => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys(
              'username',
              'firstName',
              'lastName',
              'id'
            );
            expect(res.body.username).to.equal(username);
            expect(res.body.firstName).to.equal(firstName);
            expect(res.body.lastName).to.equal(lastName);
            return User.findOne({
              username
            });
          })
          .then(user => {
            expect(user).to.not.be.null;
            expect(user.firstName).to.equal(firstName);
            expect(user.lastName).to.equal(lastName);
          });
      });
    });

    describe('GET', function() {
      it('Should return an empty array initially', function() {
        return chai.request(app).get('/users').then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(0);
        });
      });
      it.only('Should return an array of users', function() {
        return User.create(
          {
            username,
            password,
            firstName,
            lastName
          },
          {
            username: usernameB,
            password: passwordB,
            firstName: firstNameB,
            lastName: lastNameB
          }
        )
          .then(() => chai.request(app).get('/users'))
          .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.length(2);
            expect(res.body[0]).to.deep.equal({
              username,
              firstName,
              lastName,
              id: res.body[0].id
            });
            
            expect(res.body[1]).to.deep.equal({
              username: usernameB,
              firstName: firstNameB,
              lastName: lastNameB,
              id: res.body[1].id
            });
          });
      });
      it('Should get a specific user', function() {
        let authToken;
        return chai
          .request(app)
          .post('/users')
          .send({
            username,
            password,
            firstName,
            lastName
          })
          .then(res => {
            return chai
            .request(app)
            .post('/auth/login')
            .send({
              username: username,
              password: password
            })
            .then(res => {
              authToken = `Bearer ${res.body.jwtToken}`;
              return chai
              .request(app)
              .get(`/users/${username}`)
              .set('Authorization', `${authToken}`)
              .then(res => {
                expect(res).to.have.status(200);
                expect(res.body.username).to.equal(username);
                expect(res.body.firstName).to.equal(firstName);
                expect(res.body.lastName).to.equal(lastName);
              })
            })
          })
        });//it should get a specific user
        // it('Should delete a specific user', function() {
        //   return User.create(
        //     {
        //       username,
        //       password,
        //       firstName,
        //       lastName
        //     },
        //     {
        //       username: usernameB,
        //       password: passwordB,
        //       firstName: firstNameB,
        //       lastName: lastNameB
        //     })
        //     .then(() => {
        //       return chai
        //     .request(app)
        //     .get('/users')
        //     .then(res => {
        //       console.log(`/////////////////////////////`);
        //       console.log(res.body);
        //       console.log(`/////////////////////////////`);

        //       return chai
        //       .request(app)
        //       .delete(`/${res.body[0].username}/${res.body[0].id}`)
        //       .then(res => {
        //         expect(res).to.have.status(204);
        //       })
        //     })
        //     })
          
        // });//it should delete a specific user

        it('should delete a user interview by id', function(){
          return Interview.create({
            username: username,
            firstName: firstName,
            responses: [{questionText: "something?", responseText: "response"}]
          })
          .then(interview => {
            console.log(interview);
          })
        });//it should delete a user interview by id
    });
  });
});
