const schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = 20;
rule.minute = 30;
// 7 hours ahead of PST
rule.tz = 'UTC';

const newChallengeTimer = schedule.scheduleJob(rule, function() {
  console.log('Today is recognized by Rebecca Black and Honey Boo Boo!');
});

module.exports = { newChallengeTimer };
