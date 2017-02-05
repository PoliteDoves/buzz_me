var Sequelize = require('sequelize');

if(process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    pool: {
      min: 1,
      max: 5,
      idle: 20000
    }
  });
} else {
  db = new Sequelize('buzzme_db', 'root', '', {
    dialect: 'mysql',
    port: 3306,
    pool: {
      min: 1,
      max: 5,
      idle: 20000
    }
  });
}

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function(err) {
    console.log('Unable to connect to the database: ', err);
  });

module.exports = db;
