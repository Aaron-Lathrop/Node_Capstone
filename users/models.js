'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const responseSchema = mongoose.Schema({
    questionText: {type: String, required: true},
    responseText: {type: String, required: true},
    username: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

const interviewSchema = mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    created: {type: Date, default: Date.now},
    responses: [responseSchema]
});

const UserSchema = mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    created: {type: Date, default: Date.now},
    interviews: [interviewSchema]
});

UserSchema.methods.serialize = function() {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

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

const User = mongoose.model('User', UserSchema);
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = {User, Interview};