

module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/users', function(req, res) {
    console.log('Attempting to create new user');
    console.log('Reqest body: ', req.body);
    db.Users.findOrCreate({where: {
      name: req.body.name,
      //phone_number: req.body.phoneNumber,
      email: req.body.email
    }})
    .then(u=>res.send(u))
  });

  app.get('/api/tasks/:email', function(req, res) {
    console.log('Req Params Email: ', req.params.email);

    db.Users.findOne({
      where: {
        email: req.params.email
      }
    })
    .then(function(user) {
      db.Tasks.findAll({
        where: {
          user_id: user.dataValues.id
        }
      })
      .then(function(results) {
        res.send(results);
      });
    })
  });

  app.post('/api/tasks/:email', function(req, res) {
    console.log('Attempting to create new task');
    console.log('Request Body: ', req.body);
    console.log('email', req.params.email);

    db.Users.findOne({
      where: {
        email: req.params.email
      }
    })
    .then(function(user) {
      db.Tasks.create({
        user_id: user.dataValues.id,
        dateTime: req.body.dateTime,
        text: req.body.text,
        isCompleted: req.body.isCompleted
      })
      .then(task => res.send(task))
    })
    .catch(e=>res.send(`Error: ${e}`))


  });
}
