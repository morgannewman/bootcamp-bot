/* --------BOT MESSENGER INTERFACE---------
This module exposes an interface to:

  1. Generate a new challenge message for the chat channel
    - sendNewChallenge()
    - This should ONLY be used by challenge-clock to set a new challenge automatically

  2. Generate messages for the current and last challenges
    - sendCurrentChallenge() and sendLastChallenge()
    - This should be used in the command files to respond to
      !currentchallenge and !lastchallenge commands
*/

const Discord = require('discord.js');
const { CHALLENGE_CHANNEL_ID, SERVER_ID } = require('./config');
// Load data access layer
const {
  getCurrentChallenge,
  getLastChallenge,
  setNewChallenge
} = require('./data');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  TODO: Get this working. Desired behavior:
    1. Run getNewChallenge() to update the data layer and receive the new challenge obj
    2. Send a new message to the channel tagging everyone
      - @everyone Time to grind Ye Olde Tanks. Today's Challenge is Ready!
    3. Send a second message that reuses sendCurrentChallenge() to send the challenge
    card in chat
    4. Updates the challenge channel description with the new challenge
      - Today's challenge - https://leetcode.com/some-bullshit-url
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const sendNewChallenge = client => {
  console.log('We running sendNewChallenge');
  // look up the server and channel from the config
  const challengeMessageChannel = client.guilds
    .find(guild => guild.id === SERVER_ID)
    .channels.find(channel => channel.id === CHALLENGE_CHANNEL_ID);

  return (
    setNewChallenge()
      // Broadcast new challenge
      .then(data => {
        // Set the daily channel topic
        challengeMessageChannel.setTopic(generateChallengeChannelTopic(data));

        // Create and send message to channel
        return challengeMessageChannel.send(generateChallengeEmbed(data));
      })
      .catch(err => {
        console.error(err);
        challengeMessageChannel.send(
          `OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!
          The code monkeys at our headquarters are working VEWY HAWD to fix this!`
        );
      })
  );
};

/***** Current/previous challenge functions *****/
const sendCurrentChallenge = (client, message, args) => {
  console.log('========== Running !currentchallenge ==========');
  // get current challenge from cache
  getCurrentChallenge()
    // send message to client
    .then(data => message.channel.send(generateChallengeEmbed(data)))
    // Current challenge doesn't exist
    .catch(err => {
      console.error(err);
      message.channel.send("Aww shucks! We're all out of challenges.");
    });
};

const sendLastChallenge = (client, message, args) => {
  console.log('========== Running !lastchallenge ==========');
  // get last challenge from cache
  getLastChallenge()
    // send message to client
    .then(data => message.channel.send(generateChallengeEmbed(data)))
    // Last challenge doesn't exist
    .catch(err => {
      console.error(err);
      message.channel.send("Whoopsies! Could not find yesterday's challenge.");
    });
};

/***** Message embed functions *****/
// Generates embed
const generateChallengeEmbed = data => {
  return new Discord.RichEmbed()
    .setTitle(`Daily Challenge - ${generateChallengeTitle(data)}`)
    .setColor('CA8019')
    .setTimestamp()
    .setThumbnail('https://leetcode.com/static/images/LeetCode_logo.png')
    .setURL(generateChallengeLink(data))
    .addField('Challenge', generateChallengeDescription(data));
};

// Sets topic
const generateChallengeChannelTopic = data => {
  return `Today's challenge - ${generateChallengeLink(data)}`;
};

// Generates challenge descriptions
const generateChallengeDescription = challenge => {
  const { description } = challenge;
  return description;
};

// Generates challenge title
const generateChallengeTitle = challenge => {
  return challenge.title;
};

// Generates challenge link
const generateChallengeLink = challenge => {
  return challenge.url;
};

module.exports = {
  sendNewChallenge,
  sendCurrentChallenge,
  sendLastChallenge
};
