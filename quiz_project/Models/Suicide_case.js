const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const Suicide_case = sequelize.define('Suicide_case', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  suicide: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[0, 1]],
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Suicide_case;

// Synchronisation du modèle avec la base de données
Suicide_case.sync({ force: false })
  .then(() => {
    console.log('Table "suicide_cases" synchronisée avec la base de données.'); 
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la table "suicide_cases":', error);
  });
