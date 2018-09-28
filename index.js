// Environment variables
require('dotenv').config();
// Discord modules
const Discord = require('discord.js');
const client = new Discord.Client();
const CommandSystem = require('./command-system.js')();
// Challenge schedule modules
// Runs M-F 1 hour before class ends
const scheduler = require('node-schedule');
const { challengeSchedule } = require('./challenge-bot/config');
const { sendNewChallenge } = require('./challenge-bot/messenger');

client.on('ready', () => {
  const newChallengeTimer = scheduler.scheduleJob(challengeSchedule, () =>
    sendNewChallenge(client)
  );
  console.log('Ready!');
});

client.on('message', message => {
  CommandSystem.execute(client, message);
});

CommandSystem.load(function() {
  console.log('Command system loaded.');
});

client.login(process.env.TOKEN);
