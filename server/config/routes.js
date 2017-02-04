

module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/users', function(req, res) {
    console.log('Attempting to create new user');
    console.log('Reqest body: ', req.body);
    db.Users.findOrCreate({where: {
      name: req.body.name,
      email: req.body.email
    }})
    .then(u=>res.send(u))
  });

  app.put('/api/users/:email', function(req, res) {
    db.Users.findOne({
      where: {
        email: req.params.email
      }
    })
    .then(function(user) {
      user.update(req.body);
    });
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

  app.put('/api/tasks/:id', function(req, res) {
    console.log('Got a PUT request: ', req.body);
    db.Tasks.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(task) {
      task.update(req.body);
      res.send(task);
    });
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
        isCompleted: req.body.isCompleted,
        interval: req.body.interval
      })
      .then(task => res.send(task))
    })
    .catch(e=>res.send(`Error: ${e}`))
  });

  app.delete('/api/task/:id', function(req, res) {
    db.Tasks.destroy({
      where: { id: req.params.id }
    })
    .then(function() {
      res.send('Task deleted');
    });
  });

  app.delete('/api/tasks', function(req, res) {
    db.Tasks.destroy({
      where: {
        isCompleted: true
      }
    })
    .then(e => {
      res.send('All completed tasks were deleted');
    });
  });
}
