'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {User} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

const { localStrategy, jwtStrategy } = require('../auth');
const passport = require('passport');
passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', {session: false});


// Post to register a new user
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField
    });
  }

  const stringFields = ['username', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField
    });
  }

  // If the username and password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField
    });
  }

  const sizedFields = {
    username: {
      min: 1
    },
    password: {
      min: 10,
      // bcrypt truncates after 72 characters, so let's not give the illusion
      // of security by storing extra (unused) info
      max: 72
    }
  };
  const tooSmallField = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
            req.body[field].trim().length < sizedFields[field].min
  );
  const tooLargeField = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
            req.body[field].trim().length > sizedFields[field].max
  );

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField]
          .min} characters long`
        : `Must be at most ${sizedFields[tooLargeField]
          .max} characters long`,
      location: tooSmallField || tooLargeField
    });
  }

  let {username, password, firstName = '', lastName = ''} = req.body;
  // Username and password come in pre-trimmed, otherwise we throw an error
  // before this
  firstName = firstName.trim();
  lastName = lastName.trim();
  
  return User.find({username})
    .countDocuments()
    .then(count => {
      console.log(count);
      if (count > 0) {
        // There is an existing user with the same username
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      // If there is no existing user, hash the password
      
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
      res.json({message: user});
      console.log(user.serialize());
      return res.status(201).json(user.serialize());//return res.status(201).json(user.serialize());
    })
    .catch(err => {
      console.error(err);
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({code: 500, message: 'OH NO EVERYTHING IS BROKEN!'});
    });
});

router.get('/:username', jwtAuth, (req, res) => {
  return User.findOne({username: req.params.username})
      .then(user => res.json(user.serialize()))
      .catch(err => res.status(500).json({message: 'Internal server error'}));
});

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