const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config/stoneclane.config.js');
const project_config = require('../config/stoneclane.project_config.js');

module.exports = {
    name: 'projects',
    description: 'View all our Projects',
    run: async (client, message, interaction) => {
      let projects = new MessageEmbed()
    .setTitle("Stoneclane Development's Projects Selecting")
    .setColor('#000000')
    .setDescription('**Please Select a project below to view all its history and biography**')
    .setFooter({ text: config.footer });

    const GiveAways = new MessageEmbed()
    .setTitle(project_config.GiveAways.title)
    .setColor(project_config.GiveAways.color)
    .setDescription(project_config.GiveAways.description)
    .setImage(project_config.GiveAways.image)
    .setFooter({ text: project_config.GiveAways.footer});

  const TrestHost = new MessageEmbed()
    .setTitle(project_config.TrestHost.title)
    .setColor(project_config.TrestHost.color)
    .setDescription(project_config.TrestHost.description)
    .setImage(project_config.TrestHost.image)
    .setFooter({ text: project_config.TrestHost.footer});

    const Stoneclane = new MessageEmbed()
    .setTitle(project_config.Stoneclane.title)
    .setColor(project_config.Stoneclane.color)
    .setDescription(project_config.Stoneclane.description)
    .setImage(project_config.Stoneclane.image)
    .setFooter({ text: project_config.Stoneclane.footer});


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
            emoji: project_config.GiveAways.emoji,
        },
        {
            label: `TrestHost`,
            value: `TrestHost`,
            description: `View more informations based to TrestHost!`,
            emoji: project_config.TrestHost.emoji,
        },
        {
          label: `Stoneclane.xyz`,
          value: `Stoneclane.xyz`,
          description: `View more informations based to Stoneclane.xyz!`,
          emoji: project_config.Stoneclane.emoji,
        }
    ])
),
];

  const initialMessage = await message.reply({ embeds: [projects], components: components(false) });

  const filter = (interaction) => interaction.user.id === message.member.id;

        const collector = await message.channel.createMessageComponentCollector(
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
 },
};