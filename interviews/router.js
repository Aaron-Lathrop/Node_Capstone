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


router.get('/:username/interview', jwtAuth, (req,res) => {
  // if(!(req.params.username && req.body.username && req.params.username === req.body.username)) {
  //   const message = (`Request path username (${req.params.usernmae}) must match ` + 
  //   `request body username ${req.body.username}`);
  //   console.error(message);
  //   return res.status(400).json({message: message});
  // }
  User.findOne({username: req.params.username})
  .then(user => {
    res.json({
      interviews: user.interviews.map(
        (interview) => interview.serialize())
    });
  })
  .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error! Oh my!"});
  });
});

router.post('/:username/interview', jwtAuth, (req,res) => {
  if(!(req.params.username && req.body.username && req.params.username === req.body.username)) {
    const message = (`Request path username (${req.params.usernmae}) must match ` + 
    `request body username ${req.body.username}`);
    console.error(message);
    return res.status(400).json({message: message});
  }
  
  User.findOne({username: req.params.username})
  .then(user => {
    user.interviews.push(req.body);
    return user.save();
    } 
  )
  .then(res.status(201).json({message: `interview saved successfully`}))
  .catch(err => {res.end(500).json({message: 'Internal server error! Oh my!'})})
});

router.put('/:username/interview/:id', jwtAuth, function(req,res){
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        const message = (`Request path id (${req.params.id}) must match ` + 
        `request body id ${req.body.id}`);
        console.error(message);
        return res.status(400).json({message: message});
    }

    const toUpdate = {};
    const updateableFields = ["responses"];

    updateableFields.forEach(field => {
        if(field in req.body){
            toUpdate[field] = req.body[field];
        }
    });

    User.findOne({username: req.params.username})
    .then(user => user.interviews.forEach(function(interview, index) {
      if(interview._id == req.body.id){
        console.log(user.interviews[index].responses);
        console.log(toUpdate);
        user.interviews[index].responses = toUpdate;
        return user.save() 
      }
       
    }))
    //.then(user => user.interviews.findByIdAndUpdate(req.params.id, { $set: toUpdate}))
    .then(res.status(204).end())
    .catch(err => {
      console.error(err);
      res.status(500).json({message: "Internal server error! Oh my!"});
  });    
});

router.delete('/:username/interview/:id', jwtAuth, function(req,res){
  if(!(req.params.username && req.body.username && req.params.username === req.body.username)){
    const message = (`Request path username (${req.params.username}) must match`+
    `request body username (${req.body.username})`);
    console.error(message);
    res.status(400).json({message: message});
  }

  if(!(req.params.id && req.body.id && req.params.id === req.body.id)){
    const message = (`Request path id (${req.params.id}) must match`+
    `request body id (${req.body.id})`);
    console.error(message);
    res.status(400).json({message: message});
  }

  User.findOne({username: req.body.username})
  .then(user => user.interviews.forEach(function(interview, index) {
    if(interview._id == req.body.id){
      user.interviews.splice(index,1);
      return user.save() 
    }
     
  }))
  .then(res.status(201).json({message: "interview successfully deleted"}))
  .catch(err => {
    console.error(err);
    res.status(500).json({message: `Internal server error! Oh my!`})
  });
});

module.exports = {router};