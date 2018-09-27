
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
      challengeInfo = _challengeInfo;
      return updateCurrentChallenge(challengeInfo);
    })
    .then(() => {
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
};