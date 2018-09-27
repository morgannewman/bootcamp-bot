const {
  generateChannelChallengeMessage
} = require('../include/challenge-message');
// Cache functions
const { getCurrentChallenge } = require('../challenge-bot/cache');
// Challenge functions
const {
  generateChallengeDescription,
  generateChallengeTitle,
  generateChallengeLink
} = require('../challenge-bot/challenge');

exports.run = (client, message, args) => {
  console.log('========== Running currentChallenge ==========');
  // Reads from the cache (cache.js => currentChallenge.json)
  getCurrentChallenge()
    .then(data => {
      // message.channel.send(
      //   'Time to grind Ye Olde Tanks. Today\'s Challenge is Ready!'
      // );
      // Generates and sends RichEmbed message
      message.channel.send(generateChannelChallengeMessage(data));
    })
    // Current challenge doesn't exist
    .catch(err => console.error(err));
};
