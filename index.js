const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const CommandSystem = require('./command-system.js')();

client.on('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  CommandSystem.execute(client, message);
});

CommandSystem.load(function() {
  console.log('Command system loaded.');
});

client.login(process.env.TOKEN);
