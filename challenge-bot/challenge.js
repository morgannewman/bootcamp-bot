
const {CHANNEL_ID, SERVER_ID} = require('./config');
const getNewChallenge = require('./database');
const { updateCurrentChallenge } = require('./cache');

const fetchDailyChallenge = (client) => {
  // look up the server and channel specified by the config
  const challengeChannel = client.guilds.get(SERVER_ID).channels.get(CHANNEL_ID);
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
      const msg = generateChallengeMsg(challengeInfo);
      return challengeChannel.send(msg);
    })
    .catch(err => {
      challengeChannel.send('Uh oh... we couldn\'t load today\'s challenge. That\'s probably a bad sign.');
    });
};

// accepts challenge json and returns a string formatted for a discord message
// used here and in commands folder to format messages
const generateChallengeMsg = (challenge) => {
  const {title, desc, url} = challenge;
  const formattedMessage =
    `**${title}**
    ${desc}
    <${url}>`;
  return formattedMessage;
};

module.exports = {fetchDailyChallenge, generateChallengeMsg};