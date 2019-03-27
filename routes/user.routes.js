const express = require('express');
const router = express.Router();
const user = require('../controllers/user.controller');
//falta middleware login+user


router.get('/my-profile', user.getProfile); 

// router.put('/my-profile/edit', auth.editProfile);

module.exports = router;
