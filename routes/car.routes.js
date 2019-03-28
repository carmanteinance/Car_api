
const express = require('express');
const router = express.Router();
const car = require('../controllers/car.controller');
const secure = require('../middleware/secure.middleware');


router.get('/my-cars', secure.isAuthenticated, car.list);

router.get('/my-cars/:id', secure.isAuthenticated, car.getOne);

router.post('/my-cars/newCar', secure.isAuthenticated, car.addCar);

router.put('/my-cars/edit/:id', secure.isAuthenticated, car.doEdit);

router.delete('/my-cars/delete', secure.isAuthenticated, car.delete);


module.exports = router;