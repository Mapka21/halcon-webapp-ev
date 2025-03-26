// middleware/roleMiddleware.js

module.exports = function(allowedRoles) {
    return function(req, res, next) {
      // req.user se setea en el middleware auth.js, que decodifica el JWT
      const userRole = req.user.role;
  
      // Verifica si el rol del usuario está dentro de los roles permitidos
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: no tienes permiso para realizar esta acción.' });
      }
      next();
    };
  };
  