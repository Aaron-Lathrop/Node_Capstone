'use strict';
const express = require('express');
const app = express();
app.use(express.json());


app.use(express.static('public'));


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