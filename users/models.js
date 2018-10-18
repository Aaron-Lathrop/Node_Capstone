'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// const interviewSchema = mongoose.Schema({
//     username: {type: String, required: true},
//     firstName: {type: String, required: true},
//     created: {type: Date, default: Date.now},
//     responses: {type: Array, sparse: true}
// });

const UserSchema = mongoose.Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    created: {type: Date, default: Date.now},
    interviews: {type: Array, default: []}
}

);

UserSchema.methods.serialize = function() {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
        //id: this._id || ''
    };
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

// interviewSchema.pre('create', function(next){
//     this.populate('responses');
//     next();
// });

// interviewSchema.methods.serialize = function() {
//     return {
//         id: this._id,
//         created: `${this.created.getMonth()+1}/${this.created.getDate()}/${this.created.getFullYear()}`,
//         responses: this.responses
//     };
// };

const User = mongoose.model('User', UserSchema);

//const Interview = mongoose.model("Interview", interviewSchema);

module.exports = {User};