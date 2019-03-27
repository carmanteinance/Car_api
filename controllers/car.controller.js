const createError = require('http-errors');

const Car = require ('../models/car.model');
const User = require ('../models/user.model')


module.exports.list = (req, res, next) =>{

  Car.find({ user: req.user._id })
    //.populate('user')
    .then(car => res.json(car))
    .catch(next);
}

module.exports.addCar = (req, res, next) =>{

  const car = new Car(req.body);

  car.save()
    .then(car => res.status(201).json(car))
    .catch(next);

}


module.exports.doEdit = (req, res, next) =>{

  

}


module.exports.delete = (req, res, next) =>{

  

}