'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    customerNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fiscalData: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Ordered', 'In process', 'In route', 'Delivered'],
      defaultValue: 'Ordered'
    },
    evidenceInRoute: {
      type: DataTypes.STRING,
      allowNull: true
    },
    evidenceDelivered: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  
  Order.associate = function(models) {
    // Una orden pertenece a un usuario (quien la creó)
    Order.belongsTo(models.User, { foreignKey: 'createdBy' });
  };
  
  return Order;
};
