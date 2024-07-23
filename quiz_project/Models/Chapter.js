

const { DataTypes } = require('sequelize');
const sequelize = require('../Sequelize');

const Chapter = sequelize.define('Chapter', {
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

module.exports = Chapter;
