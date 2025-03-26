const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');

// Ruta para buscar una orden por invoiceNumber (pública)
router.get('/search', orderController.searchOrder);

// Rutas protegidas
router.get('/', auth, orderController.getOrders);
router.get('/view/:id', auth, orderController.viewOrder);
router.get('/archived', auth, orderController.getArchivedOrders);
router.post('/restore/:id', auth, orderController.restoreOrder);

// Crear orden: solo rol Sales puede crear
router.post('/create', auth, roleMiddleware(['Sales']), orderController.createOrder);

// Actualizar orden: solo Warehouse o Route pueden actualizar estado
router.post('/update/:id', auth, roleMiddleware(['Warehouse', 'Route']), orderController.updateOrder);

// Eliminar orden (lógicamente)
router.post('/delete/:id', auth, orderController.deleteOrder);

module.exports = router;
