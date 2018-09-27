const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const CommandSystem = require('./command-system.js')();
const { CHALLENGE_POST_TIME } = require('./challenge-bot/config.js');
const schedule = require('node-schedule');
const { fetchDailyChallenge } = require('./challenge-bot/challenge.js');

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  CommandSystem.execute(client, message);
});

CommandSystem.load(function() {
  console.log('Command system loaded.');
});

client.login(process.env.TOKEN);

const challengeSchedule = schedule.scheduleJob(
  `${CHALLENGE_POST_TIME.minute},
  ${CHALLENGE_POST_TIME.hour} 17 * * 1-5`,
  fetchDailyChallenge
);
