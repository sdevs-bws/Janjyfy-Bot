const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
  name: 'ping',
  description: 'Shows current latency',
  run: async (client, interaction) => {
    let ping = Date.now()

    interaction.reply({ embeds: [
      new EmbedBuilder()
        .setColor(colors.main)
        .setDescription(`<:ping:939881032260411392>  **CLIENT PING:** ${ms(client.ws.ping)}\n\n<:ping:939881032260411392>  **MY PING:** ${ms(Date.now() - ping)}`)
        .setFooter({ text: config.footer })
    ] });
  },
};
