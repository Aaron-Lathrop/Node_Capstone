'use strict';

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();


const createAuthToken = function(user) {
    return jwt.sign({user}, config.JWT_SECRET, {
        subject: user.username,
        expiresIn: config.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

const localAuth = passport.authenticate('local', {session: false});

router.use(express.json());

router.post('/login', localAuth, (req,res) => {
    const authToken = createAuthToken(req.user.serialize());
    res.setHeader("Set-Cookie", `access_token=${authToken}`);
    res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

router.post('/refresh', jwtAuth, (req,res) => {
    const authToken = createAuthToken(req.user);
    res.json({authToken});
});

module.exports = {router};