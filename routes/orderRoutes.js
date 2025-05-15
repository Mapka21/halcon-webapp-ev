// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const role = require('../middleware/roleMiddleware');

// 1) Ruta pública de búsqueda desde Home:
router.get('/search', orderController.searchOrder);

// 2) Listar órdenes activas (protegida)
router.get('/', auth, orderController.getOrders);

// 3) Ver detalle de una orden (protegida)
router.get('/view/:id', auth, orderController.viewOrder);

// 4) Listar órdenes archivadas (protegida)
router.get('/archived', auth, orderController.getArchivedOrders);

// 5) Restaurar una orden archivada (protegida)
router.post('/restore/:id', auth, orderController.restoreOrder);

// 6) Crear nueva orden (solo Sales)
router.post('/create', auth, role(['Sales']), orderController.createOrder);

// 7) Actualizar estado/evidencias (Warehouse y Route)
router.post(
  '/update/:id',
  auth,
  role(['Warehouse', 'Route']),
  orderController.updateOrder
);

// 8) Eliminar (archivar) orden (protegida)
router.post('/delete/:id', auth, orderController.deleteOrder);

module.exports = router;
