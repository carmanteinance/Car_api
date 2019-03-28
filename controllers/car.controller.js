const createError = require('http-errors');

const Car = require ('../models/car.model');
const User = require ('../models/user.model');


module.exports.list = (req, res, next) =>{

  Car.find({ user: req.user._id })
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

  Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(car => {
      if (!car) {
        throw createError(404, 'car not found');
      } else {
        res.json(car);
      }
    })
    .catch(next);
  

}


module.exports.delete = (req, res, next) =>{

  

}