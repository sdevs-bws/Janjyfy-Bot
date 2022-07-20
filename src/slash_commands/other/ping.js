const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: 'ping',
  description: 'Shows current latency',
  async execute(interaction, bot) {
    let ping = Date.now()

    interaction.channel.send('Pinging..!').then(async m => {
      await m.delete()
      const embed = new MessageEmbed()
        .setColor(776785)
        .setDescription(`<:pingms:962312529005137990>  **CLIENT PING:** ${ms(bot.ws.ping)}\n\n<:pingms:962312529005137990>  **MY PING:** ${ms(Date.now() - ping)}`)
        .setFooter({ text: config.footer});

      interaction.reply({ content: null, embeds: [embed] });
    })
  },
};