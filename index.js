const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const CommandSystem = require('./command-system.js')();
const {CHALLENGE_POST_TIME, CHANNEL_ID, SERVER_ID} = require('./config');
const schedule = require('schedule');

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

const challengeSchedule = schedule.scheduleJob(`${CHALLENGE_POST_TIME.minute},
  ${CHALLENGE_POST_TIME.hour} 17 * * 1-5`, () => {

  const challengeChannel = client.guilds.get(SERVER_ID).channels.get(CHANNEL_ID);
  // expects the db to return a promise that passes an object with id, title, desc, and url
  challengeInterface.getNewChallenge()
    .then(challengeInfo => {
      const {title, desc, url} = challengeInfo;
      const formattedMessage =
        `**${title}**
        ${desc}
        <${url}>`;
      challengeChannel.send(formattedMessage);
    })
    .catch(err => {
      challengeChannel.send('Uh oh... we couldn\'t load today\'s challenge. That\'s probably a bad sign.');
    });
});