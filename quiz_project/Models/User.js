const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'kid', 
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = User;


sequelize.sync({ force: false })
  .then(() => {
    console.log('Table synchronisée avec la base de données.');
  })
  .catch((error) => {
    console.error('Erreur lors de la synchronisation de la table:', error);
  });

module.exports = User;
