const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.serializeUser((user, next) => {
    next(null, user.id);
  });
  
passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => next(null, user))
      .catch(next)
});

passport.use('local-auth', new LocalStrategy({ usernameField: 'email', passwordField: 'password'},
    (email, password, done) => {
      User.findOne({ email: email }) 
        .then( user => {
            if (!user) { 
                done(null, false, 'Incorrect email or password'); 
            } else {
                return user.checkPassword(password) 
                    .then(isCorrect => {
                        isCorrect? done(null, user) : done(null, false, 'Incorrect email or password');
                    })                       
            }
        })
        .catch(error => done(error))
    }
));

//DIFERENCIAS ENTRE checkPassword y verifyPassword 
// Por que createError... se usa?