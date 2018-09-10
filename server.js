'use strict';
console.log('server-side code is running');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const nodeSampleQuestions = {
    "questions": [
        {
            "id": "1111111",
            "questionText": "Describe the HTTP requests/response lifecycle.",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "2222222",
            "questionText": "Describe the architecture of a basic Express app. How is it organized?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "3333333",
            "questionText": "Tell me about a time when you've used Express Router. How was it helpful?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "4444444",
            "questionText": "What's your experience with continuous integration? How has it helped you?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "5555555",
            "questionText": "Describe how a Mongo database is structured.",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "6666666",
            "questionText": "How do JSON web tokens work?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        },
        {
            "id": "7777777",
            "questionText": "What is the purpose of bycrypt in the authentication process?",
            "type": "general",
            "userAdded": false,
            "public": true,
            "addedBy": "Admin",
            "advice": "Review your Thinkful curriculum."
        }
    ]
};

function getPracticeQuestion(questionList){
    
    return questionList.questions[1].questionText;
}

let server;

function runServer() {
    return new Promise((resolve,reject) => {
        server = app.listen(process.env.PORT || 8080, () => {
        console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
        resolve();
    })
    .on('error', err => {
        reject(err);
    });
});
}

function closeServer() {
    return new Promise((resolve,reject) => {
        console.log("Closing server");
        server.close(err => {
            if(err) {
                return reject(err);
            }
            resolve()
        });
    });
}

if(require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};