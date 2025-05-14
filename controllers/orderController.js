// controllers/orderController.js
const { Order } = require('../models');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ 
      where: { isDeleted: false },
      order: [['orderDate', 'DESC']] 
    });
    res.render('orders', { orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { invoiceNumber, customerNumber, customerName, fiscalData, orderDate, deliveryAddress, notes } = req.body;
  try {
    await Order.create({ 
      invoiceNumber, 
      customerNumber, 
      customerName, 
      fiscalData, 
      orderDate, 
      deliveryAddress, 
      notes
    });
    res.redirect('/orders');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, evidenceInRoute, evidenceDelivered } = req.body;
  const userRole = req.user.role; // Asignado por el middleware auth.js al decodificar el JWT

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validar transiciones de estado según rol
    if (userRole === 'Warehouse') {
      // Warehouse puede pasar de Ordered -> In process, o de In process -> In route
      if (
        !(
          (order.status === 'Ordered' && status === 'In process') ||
          (order.status === 'In process' && status === 'In route')
        )
      ) {
        return res.status(403).json({
          message: 'Warehouse no autorizado para esta transición de estado.'
        });
      }
    } else if (userRole === 'Route') {
      // Route puede pasar de In route -> Delivered
      if (!(order.status === 'In route' && status === 'Delivered')) {
        return res.status(403).json({
          message: 'Route no autorizado para esta transición de estado.'
        });
      }
    }

    // Si pasa la validación, actualiza la orden
    await order.update({
      status,
      evidenceInRoute: evidenceInRoute || order.evidenceInRoute,
      evidenceDelivered: evidenceDelivered || order.evidenceDelivered
    });

    // Redirecciona a la vista de detalle de la orden
    res.redirect('/orders/view/' + id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.update({ isDeleted: true }, { where: { id } });
    res.redirect('/orders');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id } });
    res.render('orderView', { order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.restoreOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await Order.update({ isDeleted: false }, { where: { id } });
    res.redirect('/orders/archived');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArchivedOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { isDeleted: true } });
    res.render('ordersArchived', { orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Nueva función para búsqueda por invoiceNumber (para la vista Home)
exports.searchOrder = async (req, res) => {
  const { invoiceNumber } = req.query;
  try {
    const order = await Order.findOne({ where: { invoiceNumber } });
    res.render('home', { order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
