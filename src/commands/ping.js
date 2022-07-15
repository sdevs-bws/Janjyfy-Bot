const Discord = require('discord.js');
const config = require('../config/stoneclane.config.js');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("Sending request to the websocket...")
  let pong = new Discord.MessageEmbed()
    .setAuthor({ name: '🏓 Pong!', iconURL: message.author.displayAvatarURL })
    .setTitle("Client's Ping")
    .setColor('#000000')	
    .setTimestamp()
    .addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
    .setFooter({ text: config.footer });
     m.delete()
  message.reply({ content: " ", embeds: [pong] })
}