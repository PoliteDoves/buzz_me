var Sequelize = require('sequelize');
var db = require('./database.js');

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

Users.sync({});
Tasks.sync({});

module.exports.Users = Users;
module.exports.Tasks = Tasks;