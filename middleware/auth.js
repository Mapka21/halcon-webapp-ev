// middleware/auth.js
const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret'; // Asegúrate de usar el mismo secreto que en app.js y authController

module.exports = function(req, res, next) {
  // Intenta obtener el token del header Authorization
  let token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  
  // Si no se encuentra en el header, intenta obtenerlo de la cookie
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
