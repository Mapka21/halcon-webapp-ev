// routes/dashboard.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Ruta protegida para el Dashboard
router.get('/', auth, (req, res) => {
  // Se asume que el middleware auth setea req.user con los datos del usuario
  res.render('dashboard', { user: req.user });
});

module.exports = router;
