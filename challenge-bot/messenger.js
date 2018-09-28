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
const { CHALLENGE_CHANNEL_ID, SERVER_ID } = require('../config');
// Load data access layer
const { getCurrentChallenge, getLastChallenge, getNewChallenge } = require('./data');

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
const sendNewChallenge = (client, message, args) => {
  // look up the server and channel specified by the config
  // GABE, YOU HAD SOME CODE HERE THAT GOT BORKED. WHOOPS!
  // Discord
  //   .get(SERVER_ID)
  //   .channels.get(CHANNEL_ID);

  // Get new challenge from DB
  let challengeInfo;
  return (
    getNewChallenge()
      // Broadcast new challenge
      .then(() => {
        const msg = generateChallengeCard(challengeInfo);
        return challengeChannel.send(msg);
      })
      .catch(err => {
        console.error(err);
        challengeChannel.send(
          `OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo!
          The code monkeys at our headquarters are working VEWY HAWD to fix this!`
        );
      })
  );
};

const sendCurrentChallenge = (client, message, args) => {
  console.log('========== Running !currentchallenge ==========');
  // get current challenge from cache
  getCurrentChallenge()
    // send message to client
    .then(data => message.channel.send(generateChallengeCard(data)))
    // Current challenge doesn't exist
    .catch(err => {
      console.error(err);
      message.channel.send('Aww shucks! We\'re all out of challenges.');
    });
};

const sendLastChallenge = (client, message, args) => {
  console.log('========== Running !lastchallenge ==========');
  // get last challenge from cache
  getLastChallenge()
    // send message to client
    .then(data => message.channel.send(generateChallengeCard(data)))
    // Last challenge doesn't exist
    .catch(err => {
      console.error(err);
      message.channel.send('Whoopsies! Could not find yesterday\'s challenge.');
    });
};

const generateChallengeDescription = challenge => {
  const { description } = challenge;
  return description;
};

const generateChallengeTitle = challenge => {
  return challenge.title;
};

const generateChallengeLink = challenge => {
  return challenge.url;
};


// {
//   "content": "@everyone Time to grind Ye Olde Tanks. Today's Challenge is Ready!",
//   "embed": {
//     "title": "${title}",
//     "description": "${desc}\n\n [${url}](${url})",
//     "url": "${url}",
//     "color": 16293404,
//     "thumbnail": {
//       "url": "https://leetcode.com/static/images/LeetCode_logo.png"
//     }
//   }
// }
const generateChallengeCard = data => {
  return new Discord.RichEmbed()
    .setTitle(`Daily Challenge - ${generateChallengeTitle(data)}`)
    .setColor('CA8019')
    .setTimestamp()
    .setThumbnail('https://leetcode.com/static/images/LeetCode_logo.png')
    .setURL(generateChallengeLink(data))
    .addField('Challenge', generateChallengeDescription(data));
};


module.exports = {
  sendNewChallenge,
  sendCurrentChallenge,
  sendLastChallenge
};


