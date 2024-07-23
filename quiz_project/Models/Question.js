

const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');
const Quiz = require('./Quiz');

const Question = sequelize.define('Question', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
 },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  option4: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Question.belongsTo(Quiz);
Quiz.hasMany(Question);

module.exports = Question;
