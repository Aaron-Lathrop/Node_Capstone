'use strict';
console.log('server-side code is running');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL} = require('./config');
const { Question, User, Response } = require('./models');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/mock-interview', function(req, res){
    Question
    .find()
    .limit(10)
    .then(questions => {
        res.json({
            questions: questions.map(
                (question) => question.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: "Internal server error! Oh my!"});
    });
});

app.get('/responses', function(req, res){
    Response
    .find()
    .then(responses => {
        res.json({
            responses: responses.map(
                (response) => response.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: "Internal server error! Oh my!"});
    });
});

app.get('/users', function(req, res){
    User
    .find()
    .then(users => {
        res.json({
            users: users.map(
                (user) => user.serialize())
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({message: "Internal server error! Oh my!"});
    });
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      });
    });
  }

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve,reject) => {
            console.log('Closing server');
            server.close(err => {
                if(err) {
                    return reject(err);
                }
                resolve()
            });
        });
    });
}

if(require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};