const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
    name: "invite",
    description: "Invite our bot.",
    options: [],
    run: async (client, interaction) => {

      const components = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
           .setLabel('Invite Bot')
           .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
           .setStyle('Link')
      )

        const inviteEmbed = new EmbedBuilder()
        .setTitle('Hey, you want to invite our bot?')
        //.setAuthor({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor(colors.main)
        .setDescription(`**You can invite our bot by pressing the** \`Invite Bot\` button below.`)
        .setFooter({ text: config.footer });

            await interaction.reply({
              embeds: [ inviteEmbed ],
              components: [ components ]
            });
          }
        };