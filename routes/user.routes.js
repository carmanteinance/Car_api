const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
const secure = require('../middleware/secure.middleware');


router.get('/my-profile',secure.isAuthenticated, user.getProfile); 

router.put('/my-profile',secure.isAuthenticated, user.editProfile);

module.exports = router;
