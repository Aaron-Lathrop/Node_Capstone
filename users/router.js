'use strict';
const express = require('express');
const router = express.Router();
const {User} = require('./models');
router.use(express.json());

router.post('/', (req,res) => {
    const requiredFields = ['username', 'password'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if(missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing Field',
            location: missingField
        });
    }
    const stringFields = ['username', 'password', 'firstname', 'lastname'];
    const nonStringField = stringFields.find( field => field in req.body && typeof req.body[field] !== 'string');

    if(nonStringField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Incorrect field type: expected string',
            location: nonStringField
        });
    }

    const explicitlyTrimmedFields = ['username', 'password'];
    const nonTrimmedField = explicitlyTrimmedFields.find(
        field => req.body[field].trim() !== req.body[field]
        );

    if(nonTrimmedField){
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Cannot start or end with whitespace',
            location: nonTrimmedField
        });
    }

    const sizedFields = {
        username: {min: 1},
        password: {min: 10, max: 72}
    };

    const tooSmallField = Object.keys(sizedFields).find(
        field => 'min' in sizedFields[field] && req.body[field].trim().length < sizedFields[field].max
    );

    const tooLargeField = Object.keys(sizedFields).find(
        field => 'max' in sizedField[field] && req.body[field].trim().length > sizedFields[field].max
    );

    if(tooSmallField || tooLargeField){
        return res.status(422).json({
            code:422,
            reason:'ValidationError',
            message: tooSmallField 
            ? `Must be at least ${sizedFields[tooSmallField].min} characters long` 
            : `Must be at most ${sizedFields[tooSmallField].max} characters long`,
            location: tooSmallField || tooLargeField
        });
    }

    let {username, password, firstName = '', lastName = ''} = req.body;
    firstName.trim();
    lastName.trim();

    return User.find({username})
        .count()
        .then(count => {
            if(count > 0) {
                return Promise.reject({
                    code: 422,
                    reason: 'ValidationError',
                    message: 'Username already taken',
                    location: 'username'
                });
            }
            return User.hashPassword(password);
        })
        .then(hash => {
            return User.create({
                username,
                password: hash,
                firstName,
                lastName
            });
        })
        .then(user => {
            return res.status(201).json(user.serialize());
        })
        .catch(err => {
            if(err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({code: 500, message: `Internal server error! Oh my!`});
        });
});

module.exports = {router};