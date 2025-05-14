const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'your_jwt_secret'; // Asegúrate de usar el mismo secreto que en authController

// Rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboard'); // <-- Nuevo

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta pública: Home
app.get('/', (req, res) => {
  let user = null;
  if (req.cookies.token) {
    try {
      user = jwt.verify(req.cookies.token, secret);
    } catch (err) {
      console.log("Token inválido:", err.message);
    }
  }
  res.render('home', { order: null, user });
});

// Uso de rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/dashboard', dashboardRoutes); // <-- Monta la ruta del dashboard

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
