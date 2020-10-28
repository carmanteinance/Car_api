const car = require('../controllers/car.controller');
const secure = require('../middleware/secure.middleware');


const registerCarRoutes = (router) => {
  router.get('/my-cars', secure.isAuthenticated, car.list);

  router.get('/my-cars/:id', secure.isAuthenticated, car.getOne);

  router.post('/my-cars/newCar', secure.isAuthenticated, car.addCar);

  router.put('/my-cars/edit/:id', secure.isAuthenticated, car.doEdit);

  router.delete('/my-cars/delete/:id', secure.isAuthenticated, car.delete);
  
  return router
}

// Maintenance routes

//router.get('/my-cars/:carId/maintenances', secure.isAuthenticated, car.listMaintenances);


module.exports = registerCarRoutes;