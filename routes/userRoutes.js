const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Listar todos los usuarios (protegido)
router.get('/', auth, userController.getUsers);

// Mostrar formulario para editar un usuario
router.get('/edit/:id', auth, userController.editUserForm);

// Procesar edición de usuario
router.post('/edit/:id', auth, userController.editUser);

// Crear usuario (formulario enviado)
router.post('/create', auth, userController.createUser);

module.exports = router;
