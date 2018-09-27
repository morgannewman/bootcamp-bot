const {getLastChallenge} = require('../challenge-bot/cache');
const {generateChallengeMsg} = require('challenge');

exports.run = (client, message, args) => {
  getLastChallenge()
    .then(challenge => {
      const msg = generateChallengeMsg(challenge);
      message.channel.send(msg);
    })
    .catch(err => {
      message.channel.send('Could not find yesterday\'s challenge');
    });
};