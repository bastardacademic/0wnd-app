const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const JournalEntry = sequelize.define('JournalEntry', {
  entryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  privacySetting: {
    type: DataTypes.ENUM('private', 'shared'),
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
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

module.exports = JournalEntry;
