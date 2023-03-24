const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
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
     let uptime = new EmbedBuilder()
    .setTitle("<a:IconBot:951665482245763193> Client's Uptime")
    .setColor(colors.main)	
    .setTimestamp()
    .addFields([
        { name: "⏱️ Uptime", value: `\`\`\`${duration}\`\`\``, inline: false },
        { name: "🚀 Date Launched", value: `<t:${moment(timestamp).unix()}> (<t:${moment(timestamp).unix()}:R>)`, inline: false }
    ])
    .setTimestamp()
    .setFooter({ text: config.footer });
    
  interaction.reply({ embeds: [uptime] });
}
};