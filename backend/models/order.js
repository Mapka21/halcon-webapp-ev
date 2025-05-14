const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true },
    customerName: { type: String, required: true },
    customerNumber: { type: String, required: true },
    fiscalData: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    deliveryAddress: { type: String, required: true },
    notes: { type: String },
    status: { 
        type: String, 
        enum: ['Ordered', 'In process', 'In route', 'Delivered'], 
        default: 'Ordered' 
    },
    photos: [{ type: String }]  // URLs de las fotos subidas
});

module.exports = mongoose.model('Order', orderSchema);
