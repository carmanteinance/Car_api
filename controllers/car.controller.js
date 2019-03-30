const createError = require('http-errors');

const Car = require ('../models/car.model');

module.exports.list = (req, res, next) =>{

  Car.find({ user: req.user._id },)
    .then(car => { res.json(car)})
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
  new Car({ ...req.body, user: req.user._id }).save()
    .then(car => res.status(201).json(car))
    .catch(next)
}


module.exports.doEdit = (req, res, next) =>{

  delete req.body.user;

  Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(car => {
      if (car) {
        res.status(201).json(car);
      } else {
        throw createError(404, 'Car not found');
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
        throw createError(404, 'Car not found');
      }
    })
    .catch(next)
}