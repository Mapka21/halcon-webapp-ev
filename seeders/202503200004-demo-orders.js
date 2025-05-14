'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Consulta el id del usuario admin
    const [results, metadata] = await queryInterface.sequelize.query(
      `SELECT id FROM Users WHERE email = 'admin@halcon.com' LIMIT 1;`
    );
    const adminUserId = results.length > 0 ? results[0].id : 1;

    await queryInterface.bulkInsert('Orders', [
      {
        invoiceNumber: 'INV001',
        customerNumber: 'CUST001',
        customerName: 'Cliente Uno',
        fiscalData: 'RFC123456',
        orderDate: new Date(),
        deliveryAddress: 'Dirección 1',
        notes: 'Primera orden',
        status: 'Ordered',
        evidenceInRoute: null,
        evidenceDelivered: null,
        isDeleted: false,
        createdBy: adminUserId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        invoiceNumber: 'INV002',
        customerNumber: 'CUST002',
        customerName: 'Cliente Dos',
        fiscalData: 'RFC654321',
        orderDate: new Date(),
        deliveryAddress: 'Dirección 2',
        notes: 'Segunda orden',
        status: 'In process',
        evidenceInRoute: null,
        evidenceDelivered: null,
        isDeleted: false,
        createdBy: adminUserId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
