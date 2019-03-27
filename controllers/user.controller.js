const createError = require('http-errors');
const User = require ('../models/user.model');


module.exports.getProfile = (req, res, next) => {

    if (req.user){
        res.json(req.user);   
    } else{
        throw createError(401, 'Unauthorized');
    }
    
}

module.exports.editProfile = (req, res, next) => {
    
    delete req.body.email

    Object.keys(req.body).forEach( prop => req.user[prop] = req.body[prop]);

    req.user.save()
        .then(user => res.status(201).json(user, 'User edited'))
        .catch(next)
}