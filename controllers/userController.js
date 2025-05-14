const { User } = require('../models');
const bcrypt = require('bcrypt');

// Muestra la lista de usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render('users', { users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crea un nuevo usuario
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    await User.create({ name, email, password, role, isActive: true });
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Muestra el formulario para editar un usuario
exports.editUserForm = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.render('userEdit', { user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Procesa la edición del usuario
exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, isActive } = req.body;
  try {
    // Si quisieras permitir cambiar contraseña, se haría aparte
    await User.update({ name, email, role, isActive }, { where: { id } });
    res.redirect('/users');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
