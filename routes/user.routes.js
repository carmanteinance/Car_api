const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');


router.post('/register-user', auth.register);

router.post('/login', auth.login);

router.get('/my-board', auth.mainBoard); //falta middleware

router.get('/logout', auth.logout);

module.exports = router;
