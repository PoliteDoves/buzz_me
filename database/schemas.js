var Sequelize = require('sequelize');
var db = require('./database.js');

// Define and sync the Users table ---------
var Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: Sequelize.STRING,
  phone_number: Sequelize.STRING,
  email: Sequelize.STRING
});
Users.sync({});
//------------------------------------------

// Define and sync the Tasks table ---------
var Tasks = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  user_id: Sequelize.INTEGER,
  dateTime: Sequelize.DATE,
  text: Sequelize.STRING,
  isCompleted: Sequelize.BOOLEAN,
  interval: Sequelize.INTEGER,
  parent_task: Sequelize.INTEGER
});

Tasks.belongsTo(Users, {foreignKey: 'user_id'});
Tasks.sync({});
//------------------------------------------

module.exports.Users = Users;
module.exports.Tasks = Tasks;