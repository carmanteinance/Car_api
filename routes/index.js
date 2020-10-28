const express = require('express');
const router = express.Router();

const registerCarRoutes = require('./car.routes')

registerCarRoutes(router)

module.exports = router