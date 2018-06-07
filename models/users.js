const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const userSchema = Schema({
    name: String,
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },
    email: {
        type: String, lowercase: true, required: true, unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email is invalid!']
    },
    isActive: Boolean
},
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

// middleware : hash the password before save into db
userSchema.pre('save', function (next) {
    let user = this;
    //only hash the password if it has been modifed or is new
    if (!user.isModified('password')) return next();

    //generate salt
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });

})

//instance method password compare 
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema);