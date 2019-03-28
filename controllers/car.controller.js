const createError = require('http-errors');

const Car = require ('../models/car.model');
const User = require ('../models/user.model');


module.exports.list = (req, res, next) =>{

  Car.find({ user: req.user._id })
    .then(car => res.json(car))
    .catch(next);
}

module.exports.getOne = (req, res, next) =>{

  Car.findById(req.params.id)
    .then(car => {
      if(car){
        res.status(201).json(car)
      }else {
        throw createError(404, 'car not found');
      }
    })
    .catch(next)
}

module.exports.addCar = (req, res, next) =>{

  const car = new Car(req.body);

  car.save()
    .then(car => res.status(201).json(car))
    .catch(next);
}


module.exports.doEdit = (req, res, next) =>{

  delete req.body.user;

  Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(car => {
      if (car) {
        res.status(201).json(car);
      } else {
        throw createError(404, 'car not found');
      }
    })
    .catch(next);
}


module.exports.delete = (req, res, next) =>{

  Car.findByIdAndDelete(req.params.id)
    .then(car => {
      if (car){
        res.json("Car deleted");
      } else{
        throw createError(404, 'car not found');
      }
    })
    .catch(next)
}