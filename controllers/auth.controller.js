const createError = require('http-errors');
const User = require ('../models/user.model');
const passport = require('passport');

//Feature REGISTER
module.exports.register = (res, req, next) => {

    const {email} = req.body;

    User.findOne({ email: email })
        .then (user => {

            if(user){
                throw createError( 409, 'Upss this email is already registered. Are you? Go to Login')
            }else {
                return new User(req.body).save();
            }
        })

        .then(user => res.status(201).json(user))
        .catch(next)
}

//Feature LOGIN

//Feature LOGOUT