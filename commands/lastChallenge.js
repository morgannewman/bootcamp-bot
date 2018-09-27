const { getLastChallenge } = require('../challenge-bot/cache');

exports.run = (client, message, args) => {
  console.log('========== Running lastchallenge ==========');
  getLastChallenge()
    .then(data => {
      message.channel.send('Late to the grind ye olde tank!');
      // Generates and sends RichEmbed message
      message.channel.send(generateChannelChallengeMessage(data));
    })
    .catch(err => {
      console.error(err);
      message.channel.send('Could not find yesterday\'s challenge');
    });
};
