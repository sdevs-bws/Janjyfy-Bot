const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'uptime',
    description: 'Check our uptime! 🚀',
    run: async (client, interaction) => {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const date = new Date();
   const timestamp = date.getTime() - Math.floor(client.uptime);
  let uptime = new Discord.MessageEmbed()
    .setTitle("<:pingms:962312529005137990> Client's Uptime")
    .setColor(colors.main)	
    .setTimestamp()
    .addField(`⏱️ Uptime`, `\`\`\`${duration}\`\`\``)
    .addField(`🚀 Date Launched`, `<t:${moment(timestamp).unix()}> (<t:${moment(timestamp).unix()}:R>)`)
    .setTimestamp()
    .setFooter({ text: config.footer });
    
  interaction.reply({ content: " ", embeds: [uptime] });
}
};