const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
  name: 'ping',
  description: 'Shows current latency',
  run: async (client, interaction) => {
    let ping = Date.now()

    interaction.channel.send('Pinging..!').then(async m => {
      await m.delete()
      const embed = new MessageEmbed()
        .setColor(colors.main)
        .setDescription(`<:pingms:962312529005137990>  **CLIENT PING:** ${ms(client.ws.ping)}\n\n<:pingms:962312529005137990>  **MY PING:** ${ms(Date.now() - ping)}`)
        .setFooter({ text: config.footer });

      interaction.reply({ content: null, embeds: [embed] });
    })
  },
};
