const createError = require('http-errors');
const User = require ('../models/user.model');
const passport = require('passport');

const { registerUser } = require('../services/user.service')


module.exports.register = (req, res, next) => {

    const { email } = req.body;
    try {
        const newUser = registerUser(req.body);
        return res.status(201).json(newUser);
    } catch (ex) {
        if (ex.message.test(/already exists$/)) {
            next(createError(409, 'Upss this email is already registered'))
        } else {
            next(ex);
        }
    }
}


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


module.exports.logout = (req, res, next) => {
    req.logout();
    res.status(201).json('Desconectado correctamente');
}