// quizHistorique.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const QuizHistorique = sequelize.define('QuizHistorique', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});


sequelize.sync({ force: false })
  .then(() => {
    console.log('Table synchronisée de quiz histo avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la table:', error);
  });

module.exports = QuizHistorique;
