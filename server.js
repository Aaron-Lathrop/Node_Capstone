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

let server;

function runServer(databaseUrl, port = PORT) {

    return new Promise((resolve, reject) => {
      mongoose.connect(databaseUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(process.env.PORT || 8080, () => {
          console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
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