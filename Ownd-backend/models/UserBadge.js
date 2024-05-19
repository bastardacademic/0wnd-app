const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Define UserBadge model
const UserBadge = sequelize.define('UserBadge', {
  userBadgeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'userId',
    },
  },
  badgeId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Badges',
      key: 'badgeId',
    },
  },
  earnedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = UserBadge;
