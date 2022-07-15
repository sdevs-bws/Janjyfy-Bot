const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config/stoneclane.config.js');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("Sending request to the Projects Database...")
  let projects = new MessageEmbed()
    .setTitle("Stoneclane Development's Projects Selecting")
    .setColor('#000000')
    .setDescription('**Please Select a project below to view all its history and biography**')
    .setFooter({ text: config.footer });
     m.delete()

  const GiveAways = new MessageEmbed()
    .setTitle("**Project: GiveAways** ```[Informations]```")
    .setColor('#000000')
    .setDescription('**GiveAways** is a project that is made to help a community to give away items to other people!')
    .setImage('https://cdn.discordapp.com/attachments/849221365151170581/997518212180754452/GiveAways_Backround.png')
    .setFooter({ text: config.footer});

  const TrestHost = new MessageEmbed()
    .setTitle("**Project: TrestHost** ```[Informations]```")
    .setColor('#000000')
    .setDescription('**TrestHost** is a hosting service that is made to help a community to host their own servers!')
    .setImage('https://cdn.discordapp.com/attachments/960208290506215456/992524631636459560/T3.png')
    .setFooter({ text: config.footer});


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
                  emoji: `983771145406922762`
              },
              {
                  label: `TrestHost`,
                  value: `TrestHost`,
                  description: `View more informations based to TrestHost!`,
                  emoji: `992527053259808858`
              }
          ])
      ),
  ];

  const initialMessage = message.reply({ embeds: [projects], components: components(false) });

  const filter = (interaction) => interaction.user.id === message.author.id;

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