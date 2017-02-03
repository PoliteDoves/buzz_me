
module.exports = function(app, db) {
  var accountSid = 'ACb435c01334a13231fbb11c82d1e8968f';
  var authToken = 'e30a358953d07da68c26d4a8537ff4b4';

  var client = require('twilio')(accountSid, authToken);

  var generateMessage = function (attempt, text){ //troll function
    var messages = [
      "Did you " + text + " yet?",
      "When are you going to " + text + "?",
      "Why did you not " + text + " yet?!?",
      text + ". Just do it.",
      "Seriously, " + text + " already.",
      "Are you really this bad at life? " + text + ".",
      "Eat dirt and " + text + ".",
      "!$%&",
      "Crawl in a hole."
    ]
    var index = Math.floor(Math.random() * messages.length);

    console.log(messages[index]);
    return messages[index];
  }

  db.Tasks.findAll({
    where: {
      isCompleted: false
    },
    include: [db.Users]
  })
  .then(function(tasks) {
    var currentTime = new Date();
    tasks.filter(function (task) {
      if (!task.dataValues.dateTime) {
        console.log('Skipping entry because no date/time was given');
        return false;
      }
      var taskTime = new Date(task.dataValues.dateTime);
      var msPassed = currentTime - taskTime;
      var minPassed = Math.floor(msPassed/60000);
      if (task.interval) {
        var isTime = (minPassed % task.interval) === 0;
        console.log((minPassed % task.interval));
      } else {
        var isTime = true;
      }
      task.attempt = minPassed/task.interval;
      console.log('Task.attempt: ', task.attempt);
      console.log('msPassed: ', msPassed);
      console.log('isTime: ', isTime);
      if (msPassed > 0 && isTime) {
        console.log('Returning true');
        return true;
      }
      else {
        console.log('Returning false');
        return false;
      }
    }).map(function(task){
      console.log('Tas.dataValues.text: ', task.dataValues.text);
      task.message = generateMessage(task.attempt, task.dataValues.text);
      console.log('Sending message: ' + task.message + ' to: ' + task.dataValues.user.dataValues.phone_number);
      client.messages.create({
        to: '+19855183301',
        from: '+19855098132',
        body: task.message
      }, function(err, message) {
        if (err) {
          throw err;
        }
        console.log(message.sid);
      });
    });
  });
};

