const { CHANNEL_ID, SERVER_ID } = require('./config');
const getNewChallenge = require('./database');
const { updateCurrentChallenge } = require('./cache');
const {
  generateChannelChallengeMessage
} = require('../include/challenge-message');

const broadcastNewChallenge = client => {
  // look up the server and channel specified by the config
    .get(SERVER_ID)
    .channels.get(CHANNEL_ID);

  // Get new challenge from DB
  let challengeInfo;
  return (
    getNewChallenge()
      // Update challenge files
      .then(_challengeInfo => {
        challengeInfo = _challengeInfo;
        return updateCurrentChallenge(challengeInfo);
      })
      // Broadcast new challenge
      .then(() => {
        // broadcast the update message
        // Send a message to channel tagging everyone
        // Update the channel description
        // output current challenge
        const msg = generateChannelChallengeMessage(challengeInfo);
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

module.exports = broadcastNewChallenge;
broadcastNewChallenge;
