const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.get('/register-user', auth.register);
router.post('/register-user', auth.register);

router.get('/login', auth.login);
router.post('/login', auth.login);

router.get('/my-board', auth.mainBoard); //falta middleware

router.get('/logout', auth.logout);

module.exports = router;
