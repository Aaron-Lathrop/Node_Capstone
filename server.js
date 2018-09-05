'use strict';
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post("/", function(req, res) {
    var speech =
      req.body.result &&
      req.body.result.parameters &&
      req.body.result.parameters.echoText
        ? req.body.result.parameters.echoText
        : "Seems like some problem. Speak again.";
    return res.json({
      speech: speech,
      displayText: speech,
      source: "stark-thicket-75096"
    });
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