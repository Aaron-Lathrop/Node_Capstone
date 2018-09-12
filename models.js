'use strict';

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    questionText: {type: String, required: true},
    type: String,
    userAdded: Boolean,
    public: Boolean,
    addedBy: {type: String, required: true},
    advice: String
});

const responseSchema = mongoose.Schema({
    questionText: {type: String, required: true},
    responseText: {type: String, required: true},
    userName: {type: String, required: true},
    date: Date
});

const userSchema = mongoose.Schema({
    userName: {type: String, required: true},
    token: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: String,
    created: {type: Date, default: Date.now},
    responses: [responseSchema]
});

userSchema.virtual('name').get(function(){
    return `${this.firstName} ${this.lastName}`.trim();
});

questionSchema.methods.serialize = function() {
    return {
        id: this._id,
        questionText: this.questionText,
        advice: this.advice
    };
};

responseSchema.methods.serialize = function() {
    return {
        id: this._id,
        questionText: this.questionText,
        responseText: this.responseText,
        date: this.date
    };
};

const Question = mongoose.model('Question', questionSchema);
const User = mongoose.model('User', userSchema);
const Response = mongoose.model('Response', responseSchema);

module.exports = {Question, User, Response};