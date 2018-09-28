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

// Get and send the new challenge to the server
const sendNewChallenge = client => {
  // look up the server and channel from the config
  const challengeMessageChannel = getChallengeMessageChannelID(client);
  return (
    setNewChallenge()
      // Broadcast new challenge
      .then(data => {
        // Send the message of the day
        sendMessageOfTheDay(data, challengeMessageChannel);
      })
      .catch(err => {
        console.error(err);
        sendMessageOfTheDayErrorMessage(challengeMessageChannel);
      })
  );
};

/***** Message of the day *****/
const sendMessageOfTheDay = (data, challengeChannel) => {
  // Set the daily channel topic
  setChallengeChannelTopic(data, challengeChannel);
  // Tag everyone
  // pingTheWholeSquad(challengeChannel);
  // Create and send message to channel
  sendDailyChallengeEmbed(data, challengeChannel);
};

// MOTD error message
const sendMessageOfTheDayErrorMessage = challengeChannel => {
  challengeChannel.send(
    `OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!
    The code monkeys at our headquarters are working VEWY HAWD to fix this!`
  );
};

/*** MOTD helpers ***/
// Sets challenge channel topic
const setChallengeChannelTopic = (data, challengeChannel) => {
  challengeChannel.setTopic(generateChallengeChannelTopic(data));
};

// Pings @everyone
const pingTheWholeSquad = challengeChannel => {
  challengeChannel.send(
    "Get Ready to Grind Ye Olde Tanks. Today's Challenge is Ready! @everyone"
  );
};

// Sends the daily challenge's embed to the challenge channel
const sendDailyChallengeEmbed = (data, challengeChannel) => {
  challengeChannel.send(generateChallengeEmbed(data));
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

/***** Message embed utilities *****/
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

/***** Utilities *****/
const getChallengeMessageChannelID = client => {
  return client.guilds
    .find(guild => guild.id === SERVER_ID)
    .channels.find(channel => channel.id === CHALLENGE_CHANNEL_ID);
};

// Export modules
module.exports = {
  sendNewChallenge,
  sendCurrentChallenge,
  sendLastChallenge
};
