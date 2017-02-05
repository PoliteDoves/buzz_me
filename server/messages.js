module.exports = function(app, db) {
  var accountSid = 'ACb435c01334a13231fbb11c82d1e8968f';
  var paidAccountSid = 'ACcb06a1983b396590d50965c37503ba36'
  var authToken = 'e30a358953d07da68c26d4a8537ff4b4';
  var paidAuthToken = '27da1bdd8461fc31aca5eb1504c2af9f';
  var twilioNumber = '18557293344'

  var client = require('twilio')(paidAccountSid, paidAuthToken);

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
    if (attempt >= messages.length || attempt === undefined || attempt === null || attempt === Infinity) {
      attempt = Math.floor(Math.random() * messages.length);
    }
    return messages[attempt];
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
      } else {
        console.log('----Interval did not exist. Only sending message once----');
        if (minPassed > 0.8) {
          var isTime = false;
        } else {
          var isTime = true;
        }
      }
      task.attempt = minPassed/task.interval;
      if (msPassed > 0 && isTime) {
        console.log('Returning true');
        return true;
      }
      else {
        console.log('Returning false');
        return false;
      }
    }).map(function(task){
      console.log("m 62 " + task.user.phone_number);
      console.log(JSON.stringify(task));
      if (task.user.phone_number) {
        console.log('task', task)
        task.message = generateMessage(task.attempt, task.dataValues.text);
        console.log('messageEEEE', task.message);
        client.messages.create({
          to: '+1' + task.user.phone_number,
          //from: '+19855098132',
          from: twilioNumber,
          body: task.text
        }, function(err, message) {
          if (err) {
            console.log(err);
          }
          console.log(message.sid);
        });
      }
    });
  });
};

