

module.exports = function(app, express, db) {
  //add routes and controller based on database endpoints

  app.post('/api/users', function(req, res) {
    console.log('Got your POST request');
    console.log('Reqest body: ', req.body);
    db.Users.create({
      name: req.body.name,
      phone_number: req.body.phoneNumber,
      email: req.body.email
    });
    res.send('Success');
  });
}