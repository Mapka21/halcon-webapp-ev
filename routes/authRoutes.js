const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta de login
router.post('/login', authController.login);

module.exports = router;
