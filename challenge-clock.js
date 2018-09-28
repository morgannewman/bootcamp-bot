const schedule = require('node-schedule');
const { sendNewChallenge } = require('./challenge-bot/sendMessages');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 5)];
rule.hour = 20;
rule.minute = 30;
// 7 hours ahead of PST
rule.tz = 'UTC';

const newChallengeTimer = schedule.scheduleJob(rule, function() {
  sendNewChallenge();
});

module.exports = newChallengeTimer;
