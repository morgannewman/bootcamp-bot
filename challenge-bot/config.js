const schedule = require('node-schedule');
const challengeSchedule = new schedule.RecurrenceRule();
// M - F
challengeSchedule.dayOfWeek = [0, new schedule.Range(1, 5)];
// GMT TIME: 7 hours ahead of PST
// Runs 1 hour before Thinkful class ends
challengeSchedule.tz = 'UTC';
challengeSchedule.hour = 20;
challengeSchedule.minute = 30;

module.exports = {
  challengeSchedule,
  CHALLENGE_CHANNEL_ID:
    process.env.CHALLENGE_CHANNEL_ID || '494255143760691200',
  SERVER_ID: process.env.SERVER_ID || '492865719441162250'
};
