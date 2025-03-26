// seeders/202503200003-demo-users.js
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@halcon.com',
        password: passwordHash,
        role: 'Sales',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Warehouse User',
        email: 'warehouse@halcon.com',
        password: passwordHash,
        role: 'Warehouse',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Route User',
        email: 'route@halcon.com',
        password: passwordHash,
        role: 'Route',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Purchasing User',
        email: 'purchasing@halcon.com',
        password: passwordHash,
        role: 'Purchasing',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
