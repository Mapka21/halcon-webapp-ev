// controllers/userController.js
const { User } = require('../models');

exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.render('users', { users, user: req.user, success: req.query.success });
};

exports.createUser = async (req, res) => {
  const bcrypt = require('bcrypt');
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash, isActive:true });
  res.redirect('/users?success=' + encodeURIComponent('Usuario creado correctamente'));
};

exports.editUserForm = async (req, res) => {
  const userToEdit = await User.findByPk(req.params.id);
  res.render('userEdit', { user: req.user, userToEdit, success: req.query.success });
};

exports.editUser = async (req, res) => {
  await User.update(req.body, { where:{ id:req.params.id }});
  res.redirect('/users?success=' + encodeURIComponent('Usuario actualizado correctamente'));
};
