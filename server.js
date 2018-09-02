'use strict';
const express = require('express');
const app = express();
app.use(express.json());


app.use(express.static('public'));

app.listen(process.env.PORT || 8080);
console.log(`Your app is listening on port ${process.env.PORT || 8080}`);

module.exports = {app};