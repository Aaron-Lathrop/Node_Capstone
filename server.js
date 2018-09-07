'use strict';
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/', function(req, res){
    console.log('Received POST request');
    if(!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json');
    console.log('Here is the post request from DialogFlow');
    console.log(req.body);
    console.log(`Echo text is: ${req.body.queryResult.parameters['echoText']}`);
    let echo = req.body.queryResult.parameters['echoText'];
    let responseObj = {
                        "fulfillmentText":echo,
                        "fulfillmentMessages":[{"text": {"text": [echo]}}],
                        "source":"stark-thicket-75096"
                    }
    console.log(`Here is the resonse to dialogflow: ${responseObj}`);
    return res.json(responseObj);
});

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