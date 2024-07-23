const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const HistoriqueEtatPsychique = sequelize.define('HistoriqueEtatPsychique', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  anxiete: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  depression: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = HistoriqueEtatPsychique;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Table synchronisée HistoriqueEtatPsychique avec la base de données.'); 
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation HistoriqueEtatPsychique de la table:', error);
  });

module.exports = HistoriqueEtatPsychique;
