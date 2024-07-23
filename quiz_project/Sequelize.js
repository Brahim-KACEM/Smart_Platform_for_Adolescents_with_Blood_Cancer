const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('edu_robot', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', 
});


module.exports = sequelize;
