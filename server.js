'use strict';
console.log('server-side code is running');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL} = require('./config');
const { Question, User, Response, Interview } = require('./models');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

//gets questions for user to practice during mock-interview, consider
//renaming the slug on this
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

//this creates a new interview document to record a specific set of questions and 
//responses that a user had a specific time. Questions and responses begin blank
//and will populate using the PUT endpoint
app.post('/interview', function(req,res){
    Interview
    .create({
        userName: "Admin",
        firstName: "Aaron",
        created: Date.now,
        responses: [],
        questions: []
    })
    .then(interview => res.status(201).json(interview.serialize()))
    .catch(err => {
        console.error(err);
        res.status(500).json({message: "Interal server error! Oh my!"});
    });
});

//updates the responses and questions properties of the Interview document
//the interview to be updated will be tracked by the document's id
app.put('/interview/:id', function(req, res){
    if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (`Request path id (${req.params.id}) must match ` + 
        `request body id ${req.body.id}`);
        console.error(message);
        return res.status(400).json({message: message});
    }

    const toUpdate = {};
    const updateableFields = ["responses", "questions"];

    updateableFields.forEach(field => {
        if(field in req.body){
            toUpdate[field] = req.body[field];
        }
    });
    
    Interview
    .findByIdAndUpdate(req.params.id, { $set: toUpdate})
    .then(interview => res.status(204).end())
    .catch(err => {res.end(500).json({message: 'Internal server error! Oh my!'});
    });

}); //app.put closing

//gets the user's responses
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

app.post('/responses', function(req,res){

});

//need to only find 1 user at a time

// app.get('/users', function(req, res){
//     User
//     .find()
//     .then(users => {
//         res.json({
//             users: users.map(
//                 (user) => user.serialize())
//         });
//     })
//     .catch(err => {
//         console.error(err);
//         res.status(500).json({message: "Internal server error! Oh my!"});
//     });
// });

app.post('/users', function(req,res){
    
});

app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
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