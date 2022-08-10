const { Client, CommandInteraction, MessageActionRow, MessageEmbed, MessageSelectMenu, MessageButton} = require("discord.js");
const config = require(`${process.cwd()}/src/config/janjy.config.js`);
const Schema = require('../../schemas/application');
module.exports = {
  name: "application",
  description: "Manage your applications from this 1 command",
  userPermission: "MANAGE_ROLES",
  options: [
    {
        name: "list",
        description: "List all the questions in the application system",
        type: "SUB_COMMAND",
      },
    {
      name: "add",
      description: "Add a new question to the application system",
      type: "SUB_COMMAND",
      options: [
        {
          name: "question",
          description: "what is the question going to be?",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "remove",
      description: "Remove a question from the application system",
      type: "SUB_COMMAND",
      options: [
        {
          name: "question",
          description: "question to be removed",
          type: "STRING",
          required: true,
        },
      ],
    },
    {
      name: "panel",
      description: "Send the application panel to a channel",
      type: "SUB_COMMAND",
      options: [
        {
          name: "title",
          description: "title of the panel",
          type: "STRING",
          required: true,
        },
        {
          name: "description",
          description: "description of the panel",
          type: "STRING",
          required: true,
        },
        {
          name: "image",
          description: "image of the panel use a url please",
          type: "ROLE",
          required: false,
        },
        {
          name: "channel",
          description: "channel to send the panel to",
          type: "CHANNEL",
          required: false,
        },
      ],
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
    const question = interaction.options.getString("question");
    const title = interaction.options.getString("title") || "Application System";
    const description = interaction.options.getString("description") || "If you are interested in Applying then please click the\n**Button** below to get started!";
    const image = interaction.options.getString("image") || "";
    const Channel = interaction.options.getString("channel") || interaction.channel;

    const { options } = interaction;

    let data;

    data = await Schema.findOne({ GuildID: interaction.guild.id })

    if (!data) {

        data = await Schema.create({ GuildID: interaction.guild.id })

    }

    let questions = data.Questions.join("\n");
    if (!questions) questions = "`No Questions in the system`";

    switch (options.getSubcommand()) {
        case "list":

            const listEmbed = new MessageEmbed()
            .setColor(config.embed_color)
            .setTitle("Application Questions")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription(`Application Questions in ${interaction.guild.name}\n\`${questions}\``)
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setTimestamp()
            
         return interaction.reply({ embeds: [listEmbed] })

            break;

      case "add":

        //check if there is 25 questions if so return an error
        if (data.Questions.length >= 25) {
          return interaction.reply({
            embeds: [
              new MessageEmbed()
                .setColor(config.embed_color)
                .setTitle("Error")
                .setDescription("You can only have 25 questions in the system")
            ]
          })
        }

        const questiontoAdd = question

        if (data.Questions.includes(questiontoAdd))
         return interaction.reply("This Question is already in the system")

        data.Questions.push(questiontoAdd)

        await data.save()

        interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Question Added | There are now ${data.Questions.length} Questions in the system`)
                .setDescription(`Question ${questiontoAdd} has been added to the system`)
            ]
        })

        break;

      case "remove":

        const questiontoRmv = question

        if (!data.Questions.includes(questiontoRmv))
         return interaction.reply("The Question you provided is not in the system")

        let array = data.Questions
        array = array.filter(x => x !== questiontoRmv)

        data.Questions = array

        await data.save()

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`Successfully removed \`${questiontoRmv}\` from the application system`)

        message.channel.send({embeds: [embed]})

        break;

      case "panel":

        let Apply = new MessageButton()
        .setCustomId("Apply")
        .setLabel("Apply")
        .setEmoji("📰")
        .setStyle("PRIMARY");
    
      const row = new MessageActionRow().addComponents(
        Apply,
      );
    
            let TicketEmbed = new MessageEmbed()
         .setColor('BLURPLE')
         .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
         .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
         .setTitle(title)
         .setImage(image)
         .setDescription(description)
    
         Channel.send({embeds: [TicketEmbed], components: [row]})
            
        interaction.reply({content: `Application Panel sent to ${Channel}`,ephemeral: true })

        break;
    }
  },
};