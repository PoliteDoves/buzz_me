

module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/users', function(req, res) {
    console.log('Attempting to create new user');
    console.log('Reqest body: ', req.body);
    db.Users.create({
      name: req.body.name,
      phone_number: req.body.phoneNumber,
      email: req.body.email
    });
    res.send('End');
  });

  app.get('/api/tasks', function(req, res) {
    db.Tasks.findAll({})
      .then(function(results) {
        res.send(results);
      });
  });

  app.post('/api/tasks', function(req, res) {
    console.log('Attempting to create new task');
    console.log('Request Body: ', req.body);

    db.Users.findAll({
      where: {
        email: req.body.email
      }
    })
    .then(function(user) {
      console.log(user[0].dataValues.id);
      db.Tasks.create({
        user_id: user[0].dataValues.id,
        dateTime: req.body.dateTime,
        text: req.body.text
      });
    })


    res.send('End!');
  });
}