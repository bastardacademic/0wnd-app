const User = require('./User');
const Habit = require('./Habit');
const Completion = require('./Completion');
const Reward = require('./Reward');
const Consequence = require('./Consequence');
const JournalEntry = require('./JournalEntry');
const Chat = require('./Chat');
const Badge = require('./Badge');
const UserBadge = require('./UserBadge');

// Define associations
User.hasMany(Habit, { as: 'dominant', foreignKey: 'dominantId' });
User.hasMany(Habit, { as: 'submissive', foreignKey: 'submissiveId' });
Habit.hasMany(Completion, { foreignKey: 'habitId' });
Habit.hasMany(Reward, { foreignKey: 'habitId' });
Habit.hasMany(Consequence, { foreignKey: 'habitId' });
User.hasMany(JournalEntry, { foreignKey: 'userId' });
User.hasMany(Chat, { as: 'sender', foreignKey: 'senderId' });
User.hasMany(Chat, { as: 'receiver', foreignKey: 'receiverId' });
User.belongsToMany(Badge, { through: UserBadge, foreignKey: 'userId' });
Badge.belongsToMany(User, { through: UserBadge, foreignKey: 'badgeId' });

module.exports = {
  User,
  Habit,
  Completion,
  Reward,
  Consequence,
  JournalEntry,
  Chat,
  Badge,
  UserBadge,
};
