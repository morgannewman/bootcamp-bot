const { CHANNEL_ID, SERVER_ID } = require('./config');
const getNewChallenge = require('./database');
const { updateCurrentChallenge } = require('./cache');
const {
  generateChannelChallengeMessage
} = require('../include/challenge-message');

const fetchDailyChallenge = client => {
  // look up the server and channel specified by the config
  const challengeChannel = client.guilds
    .get(SERVER_ID)
    .channels.get(CHANNEL_ID);

  let challengeInfo;
  // expects the db to return a promise that passes an object with id, title, desc, and url

  return getNewChallenge()
    .then(_challengeInfo => {
      // update files through cache.js
      challengeInfo = _challengeInfo;
      return updateCurrentChallenge(challengeInfo);
    })
    .then(() => {
      // format and send discord message
      const msg = generateChannelChallengeMessage(challengeInfo);
      return challengeChannel.send(msg);
    })
    .catch(err => {
      console.error(err);
      challengeChannel.send(
        'Uh oh... we couldn\'t load today\'s challenge. That\'s probably a bad sign.'
      );
    });
};

module.exports = {
  fetchDailyChallenge
};
