const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: 'Check our ping! 🏓',
    run: async (client, interaction) => {
      let pembed = new MessageEmbed()
		  .setColor('#0026ff')	
			.setTitle('**__Client Ping__**')
			.addField('**Latency**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
			.addField('**API Latency**', `\`${Math.round(client.ws.ping)}ms\``)
			.setTimestamp()
			.setFooter(`${interaction.user.username}`, interaction.user.avatarURL());
        interaction.reply({
          embeds: [pembed]
        });
    },
};