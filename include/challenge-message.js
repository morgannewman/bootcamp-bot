// Discord
const Discord = require('discord.js');

// Cache functions
const {
  getCurrentChallenge,
  updateCurrentChallenge
} = require('../challenge-bot/cache');

// Challenge functions
const {
  generateChallengeDescription,
  generateChallengeTitle,
  generateChallengeLink
} = require('../include/message');

const generateChannelChallengeMessage = data => {
  return new Discord.RichEmbed()
    .setTitle(`Daily Challenge - ${generateChallengeTitle(data)}`)
    .setColor('CA8019')
    .setTimestamp()
    .setThumbnail('https://leetcode.com/static/images/LeetCode_logo.png')
    .setURL(generateChallengeLink(data))
    .addField('Challenge', generateChallengeDescription(data));
};

module.exports = {
  generateChannelChallengeMessage
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
