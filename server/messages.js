module.exports = function(app, db) {
  var accountSid = process.env.TWILIO_SID || 'ACb435c01334a13231fbb11c82d1e8968f';
  //var paidAccountSid = 'ACcb06a1983b396590d50965c37503ba36'
  var authToken = process.env.TWILIO_AUTH  || 'e30a358953d07da68c26d4a8537ff4b4';
  //var paidAuthToken = '27da1bdd8461fc31aca5eb1504c2af9f';
  var twilioNumber = '18557293344'

  var client = require('twilio')(accountSid, paidAccountSid);

  //troll function
  var generateMessage = function (reminderNumber, text){
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
    ];
    //if the reminder number is invalid
    if (reminderNumber >= messages.length || reminderNumber === undefined || reminderNumber === null || reminderNumber === Infinity) {
      //generate a random reminder number
      reminderNumber = Math.floor(Math.random() * messages.length);
    }
    return messages[reminderNumber];
  }

  //gather all tasks for every user
  db.Tasks.findAll({
    where: {
      isCompleted: false
    },
    include: [db.Users]
  })
  .then(function(tasks) {
    //determine what time it is now
    var currentTime = new Date();
    //filter out tasks that should not generate reminders
    tasks.filter(function (task) {
      //filter out tasks without a reminder set
      if (!task.dataValues.dateTime) {
        console.log('Skipping entry because no date/time was given');
        return false;
      }
      var taskTime = new Date(task.dataValues.dateTime);
      var timeBetweenNowAndTask = currentTime - taskTime;
      //number of minutes rounded down since task has expired
      var minutesPassed = Math.floor(timeBetweenNowAndTask/60000);
      //task.interval is the number of minutes between reminders
      if (task.interval) {
        //it is time to send a reminder if the minutes that have passed are evenly divisible by the interval
        var isTime = (minutesPassed % task.interval) === 0;
      } else {
        console.log('----Interval did not exist. Only sending message once----');
        //if there is no interval, only send a message if it has been less than a minute since task expired
        if (minutesPassed > 0.8) {
          var isTime = false;
        } else {
          var isTime = true;
        }
      }
      //task.attempt is the attempt number of the reminder,
      //it is used to send the reminders in order
      task.attempt = minutesPassed/task.interval;

      //if the task has not expired, timeBetweenNowAndTask will be negative
      if (timeBetweenNowAndTask > 0 && isTime) {
        console.log('Returning true');
        return true;
      }
      else {
        console.log('Returning false');
        return false;
      }
    })
    //map over the remaining tasks and send a message for each one
    .map(function(task){
      if (task.user.phone_number) {
        task.message = generateMessage(task.attempt, task.dataValues.text);
        //Twilio generates a using the user's phone number and the message
        client.messages.create({
          to: '+1' + task.user.phone_number,
          //from: '+19855098132',
          from: twilioNumber,
          body: task.message
        }, function(err, message) {
          if (err) {
            console.log(err);
          }
          console.log('mes', message);
        });
      }
    });
  });
};

