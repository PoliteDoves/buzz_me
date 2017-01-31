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
  date: Sequelize.DATE,
  time: Sequelize.TIME,
  text: Sequelize.STRING,
  parent_task: Sequelize.INTEGER
});

Users.hasMany(Tasks, {as: 'Tasks', foreignKey: 'user_id'});
Tasks.sync({});
//------------------------------------------

module.exports.Users = Users;
module.exports.Tasks = Tasks;