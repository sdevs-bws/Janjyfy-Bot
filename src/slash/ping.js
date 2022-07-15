const { MessageEmbed } = require("discord.js")
const config = require("../config/stoneclane.config.js")

module.exports = {
    name: 'ping',
    description: 'Check our ping! 🏓',
    run: async (client, interaction) => {
      let pembed = new MessageEmbed()
		  .setColor('#000000')	
			.setTitle('**__Client Ping__**')
			.addField('**Latency**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
			.addField('**API Latency**', `\`${Math.round(client.ws.ping)}ms\``)
			.setTimestamp()
			.setFooter({ text: config.footer });
        interaction.reply({
          embeds: [pembed]
        });
    },
};