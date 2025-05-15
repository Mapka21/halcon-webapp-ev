// controllers/orderController.js
const { Order } = require('../models');

// Listar órdenes activas
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { isDeleted: false },
      order: [['orderDate', 'DESC']]
    });
    // Pasamos success para que Toastr pueda leerlo en el footer
    res.render('orders', {
      orders,
      user: req.user,
      success: req.query.success,  // <-- aquí
      error: req.query.error
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva orden
exports.createOrder = async (req, res) => {
  const {
    invoiceNumber,
    customerNumber,
    customerName,
    fiscalData,
    orderDate,
    deliveryAddress,
    notes
  } = req.body;

  try {
    await Order.create({
      invoiceNumber,
      customerNumber,
      customerName,
      fiscalData,
      orderDate,
      deliveryAddress,
      notes,
      status: 'Ordered',
      createdBy: req.user.id
    });
    res.redirect('/orders?success=' + encodeURIComponent('Orden creada correctamente'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar estado y evidencias
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, evidenceInRoute, evidenceDelivered } = req.body;
  const userRole = req.user.role;
  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (userRole === 'Warehouse') {
      if (
        !(
          (order.status === 'Ordered' && status === 'In process') ||
          (order.status === 'In process' && status === 'In route')
        )
      ) {
        return res.status(403).json({ message: 'Warehouse no autorizado para esta transición de estado.' });
      }
    } else if (userRole === 'Route') {
      if (!(order.status === 'In route' && status === 'Delivered')) {
        return res.status(403).json({ message: 'Route no autorizado para esta transición de estado.' });
      }
    }

    await order.update({ status, evidenceInRoute, evidenceDelivered });
    res.redirect(`/orders/view/${id}?success=` + encodeURIComponent('Estado actualizado correctamente'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar lógicamente una orden
exports.deleteOrder = async (req, res) => {
  try {
    await Order.update({ isDeleted: true }, { where: { id: req.params.id } });
    res.redirect('/orders?success=' + encodeURIComponent('Orden archivada correctamente'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ver detalle de una orden
exports.viewOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.render('orderView', { order, user: req.user, success: req.query.success });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar órdenes archivadas
exports.getArchivedOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { isDeleted: true } });
    res.render('ordersArchived', { orders, user: req.user, success: req.query.success });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restaurar orden archivada
exports.restoreOrder = async (req, res) => {
  try {
    await Order.update({ isDeleted: false }, { where: { id: req.params.id } });
    res.redirect('/orders/archived?success=' + encodeURIComponent('Orden restaurada correctamente'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Búsqueda de orden desde Home
exports.searchOrder = async (req, res) => {
  const { invoiceNumber } = req.query;
  try {
    const order = await Order.findOne({ where: { invoiceNumber } });
    res.render('home', {
      order,
      user: req.user,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
