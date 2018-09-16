'use strict';

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionText: {type: String, required: true},
    type: String,
    userAdded: Boolean,
    public: Boolean,
    addedBy: {type: String, required: true},
    advice: String
},{collection: "questions"});

const responseSchema = mongoose.Schema({
    questionText: {type: String, required: true},
    responseText: {type: String, required: true},
    userName: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const interviewSchema = mongoose.Schema({
    userName: {type: String, required: true},
    firstName: {type: String, required: true},
    created: {type: Date, default: Date.now},
    responses: [responseSchema]
});

const userSchema = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    token: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: String,
    created: {type: Date, default: Date.now},
    interviews: [interviewSchema],
    questions: [questionSchema]
},{collection: "users"});

//user schema

userSchema.virtual('name').get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.methods.serialize = function() {
    return {
        id: this._id,
        userName: this.userName,
        name: this.name
    };
};

//question schema

questionSchema.methods.serialize = function() {
    return {
        id: this._id,
        questionText: this.questionText,
        advice: this.advice
    };
};

//response schema

responseSchema.methods.serialize = function() {
    return {
        id: this._id,
        questionText: this.questionText,
        responseText: this.responseText,
        date: this.date
    };
};

//interview schema

interviewSchema.pre('create', function(next){
    this.populate('responses');
    next();
});

interviewSchema.methods.serialize = function() {
    return {
        id: this._id,
        firstName: this.firstName,
        created: this.created,
        responses: this.responses
    };
};

const Question = mongoose.model('Question', questionSchema);
const User = mongoose.model('User', userSchema);
const Response = mongoose.model('Response', responseSchema);
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = {Question, User, Response, Interview};