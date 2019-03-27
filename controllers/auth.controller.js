const createError = require('http-errors');
const User = require ('../models/user.model');
const passport = require('passport');

//Feature REGISTER
module.exports.register = (req, res, next) => {
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
module.exports.login = (req, res, next) => {

    passport.authenticate('local-auth', (error, user, message) => {

        if (error){
            next(error);
        } else if (user){
            req.login(user,(error) => 
                error? next(error) : res.status(201).json(user))
        } else{
            next(createError(401, message));
        }
    })(req,res,next);
}

//Feature LOGOUT