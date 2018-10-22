'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Interview} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const { localStrategy, jwtStrategy } = require('../auth');
const passport = require('passport');
passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {session: false});

//get a list of all the interviews a user has
router.get('/', jwtAuth, (req,res) => {
  
  Interview.find({user: req.user.id})
  .populate('user')
  .then(interviews => {
    return res.status(200).json(interviews.map(interview => interview.serialize()))
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error! Oh my!"});
  });
});

//create a new interview for the logged in user
router.post('/', jwtAuth, (req,res) => {
  
  const newInterview = {
    user: req.user.id,
    username: req.user.username,
    responses: req.body.responses
  }

  Interview.create(newInterview)
  .then(interview => {
    res.status(201).json({message: `interview saved successfully`, interview: interview})
  })
  .catch(err => {res.end(500).json({message: 'Internal server error! Oh my!'})})
});

//deletes 1 interview by id from a user's account
router.delete('/:interviewId', jwtAuth, function(req,res){

  Interview.findByIdAndDelete(req.params.interviewId)
  .then(() => {
    return res.status(201).end();
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: `Internal server error! Oh my!`})
  });
});

module.exports = {router};