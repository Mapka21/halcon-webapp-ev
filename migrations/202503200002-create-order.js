'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
         type: Sequelize.INTEGER
      },
      invoiceNumber: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true
      },
      customerNumber: {
         type: Sequelize.STRING,
         allowNull: false
      },
      customerName: {
         type: Sequelize.STRING,
         allowNull: false
      },
      fiscalData: {
         type: Sequelize.STRING,
         allowNull: false
      },
      orderDate: {
         type: Sequelize.DATE,
         allowNull: false
      },
      deliveryAddress: {
         type: Sequelize.STRING,
         allowNull: false
      },
      notes: {
         type: Sequelize.TEXT,
         allowNull: true
      },
      status: {
         type: Sequelize.ENUM,
         values: ['Ordered', 'In process', 'In route', 'Delivered'],
         defaultValue: 'Ordered'
      },
      evidenceInRoute: {
         type: Sequelize.STRING,
         allowNull: true
      },
      evidenceDelivered: {
         type: Sequelize.STRING,
         allowNull: true
      },
      isDeleted: {
         type: Sequelize.BOOLEAN,
         defaultValue: false
      },
      createdBy: {
         type: Sequelize.INTEGER,
         references: {
           model: 'Users',
           key: 'id'
         }
      },
      createdAt: {
         allowNull: false,
         type: Sequelize.DATE
      },
      updatedAt: {
         allowNull: false,
         type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
