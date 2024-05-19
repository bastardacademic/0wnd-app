const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Completion = sequelize.define('Completion', {
  completionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  habitId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Habits',
      key: 'habitId',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Completion;
