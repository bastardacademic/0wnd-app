const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Consequence = sequelize.define('Consequence', {
  consequenceId: {
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
  description: {
    type: DataTypes.STRING,
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

module.exports = Consequence;
