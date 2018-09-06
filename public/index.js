'use strict';
const express = require('express');
const app = express();
app.use(express.json());

app.post('/', function(req, res){
    console.log('Received POST request');
    if(!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json');
    console.log('Here is the post request from DialogFlow');
    console.log(req.body);
    console.log(`Echo text is: ${req.body.queryResult.parameters['echoText']}`);
    let echo = req.body.queryResult.parameters['echoText'];
    let response = " ";
    let responseObj = {
                        "fulfillmentText":response,
                        "fulfillmentMessages":[{"text": {"text": echo}}]
                    }
    console.log(`Here is the resonse to dialogflow: ${responseObj}`);
    return res.json(responseObj);
});

// $.ajax({
//     type: "POST",
//     url: "https://stark-thicket-75096.herokuapp.com",
//     // data: JSON.stringify({speech: "message"}),
//     data: this,
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function(data){return data;},
//     failure: function(errMsg) {
//         alert(errMsg);
//     }
// });

// https://youtu.be/uZrolwP5NyM?t=415