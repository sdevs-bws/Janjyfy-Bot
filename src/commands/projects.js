const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config/stoneclane.config.js');
const project_config = require('../config/stoneclane.project_config.js');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("Sending request to the Projects Database...")
  let projects = new MessageEmbed()
    .setTitle("Stoneclane Development's Projects Selecting")
    .setColor('#000000')
    .setDescription('**Please Select a project below to view all its history and biography**')
    .setFooter({ text: config.footer });
     m.delete()

  const GiveAways = new MessageEmbed()
    .setTitle(project_config.project_giveaways_title)
    .setColor(project_config.project_giveaways_color)
    .setDescription(project_config.project_giveaways_description)
    .setImage(project_config.project_giveaways_image)
    .setFooter({ text: project_config.project_giveaways_footer});

  const TrestHost = new MessageEmbed()
    .setTitle(project_config.project_tresthost_title)
    .setColor(project_config.project_tresthost_color)
    .setDescription(project_config.project_tresthost_description)
    .setImage(project_config.project_tresthost_image)
    .setFooter({ text: project_config.project_tresthost_footer});

    const Stoneclane = new MessageEmbed()
    .setTitle(project_config.project_stoneclane_title)
    .setColor(project_config.project_stoneclane_color)
    .setDescription(project_config.project_stoneclane_description)
    .setImage(project_config.project_stoneclane_image)
    .setFooter({ text: project_config.project_stoneclane_footer});


    const components = (state) => [
      new MessageActionRow().addComponents(
          new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Please Select a Project")
          .setDisabled(state)
          .addOptions([{
                  label: `GiveAways`,
                  value: `GiveAways`,
                  description: `View more informations based to GiveAways!`,
                  emoji: project_config.project_giveaways_emoji,
              },
              {
                  label: `TrestHost`,
                  value: `TrestHost`,
                  description: `View more informations based to TrestHost!`,
                  emoji: project_config.project_tresthost_emoji,
              },
              {
                label: `Stoneclane.xyz`,
                value: `Stoneclane.xyz`,
                description: `View more informations based to Stoneclane.xyz!`,
                emoji: project_config.project_stoneclane_emoji,
              }
          ])
      ),
  ];

  const initialMessage = await message.reply({ embeds: [projects], components: components(false) });

  const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: "SELECT_MENU",
                time: 300000
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "GiveAways") {
                interaction.update({ embeds: [GiveAways], components: components(false) });
            } else if (interaction.values[0] === "TrestHost") {
                interaction.update({ embeds: [TrestHost], components: components(false) });
            } else if (interaction.values[0] === "Stoneclane.xyz") {
                interaction.update({ embeds: [Stoneclane], components: components(false) });
            }
        });
        collector.on("end", (collected, reason) => {
            if (reason == "time") {
                initialMessage.edit({
                   content: "Collector Destroyed, Try Again!",
                   components: [],
                });
             }
        });
}