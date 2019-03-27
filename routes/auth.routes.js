const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');


router.post('/register-user', auth.register);

router.get('/login', auth.login);
router.post('/login', auth.login);

router.get('/logout', auth.logout);


module.exports = router;

