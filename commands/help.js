const Discord = require('discord.js');

//displays list of commands. in future should scan commands directory and display info for each programmatically/dynamically
exports.run = (client, message, args) => {
  console.log(`**********Executing help on ${message.guild.name}**********`);

  const embed = new Discord.RichEmbed()
    .setTitle('BootcampBot Help')
    .setColor('747474')
    .setFooter('Please code responsibly')
    .setTimestamp()
    .setURL('http://www.dosebot.org')
    .addField('Available commands', buildCommandList());

  message.channel.send({ embed });
};

function buildCommandList() {
  var commands = [
    '!bootcamp',
    '!mongodbtips',
    '!help',
    '!nikolas',
    '!chels',
    '!chris',
    '!sponge <text>',
    '!cameron'
  ];

  return commands.join('\n');
}
