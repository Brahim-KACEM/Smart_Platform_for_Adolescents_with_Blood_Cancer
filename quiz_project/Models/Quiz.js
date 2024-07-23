

const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');
const Chapter = require('./Chapter');

const Quiz = sequelize.define('Quiz', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
 },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Quiz.belongsTo(Chapter);
Chapter.hasMany(Quiz);

module.exports = Quiz;
