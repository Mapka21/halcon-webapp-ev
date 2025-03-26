const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const secret = 'your_jwt_secret'; // Asegúrate de usar el mismo secreto

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email }});
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, secret, { expiresIn: '1h' });
    
    // Guardamos el token en una cookie httpOnly y redirigimos a Home
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
