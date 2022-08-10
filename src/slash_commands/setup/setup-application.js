const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const Schema = require("../../schemas/application");
module.exports = {
  name: "setup-application",
  description: "Setup the server application with accept roles, categories for accepted and declined applications",
  options: [
    {
      name: "accepted-catergory",
      description: "What catergory should the accepted applications be in?",
      type: "CHANNEL",
      required: true,
    },
    {
        name: "declined-catergory",
        description: "What catergory should the declined applications be in?",
        type: "CHANNEL",
        required: true,
        },
      {
        name: "application-category",
        description: "What catergory should applications be created in?",
        type: "CHANNEL",
        required: true,
      },
      {
        name: "accept-role",
        description: "What role should be given to accepted applications?",
        type: "ROLE",
        required: true,
      },
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const acceptedCatergory = interaction.options.getChannel("accepted-catergory");
    const declinedCatergory = interaction.options.getChannel("declined-catergory");
    const applicationCategory = interaction.options.getChannel("application-category");
    const acceptRole = interaction.options.getRole("accept-role");

    try {

      if (!interaction.member.permissions.has("MANAGE_GUILD"))
        return interaction.reply({embeds: [
            new MessageEmbed()
              .setDescription(`❌ You do not have permission to use this command`)
              .setColor("RED"),
          ],
        });

      const data = await Schema.findOne({ GuildID: interaction.guild.id });

      if (!data) {

        await Schema.create({
          GuildID: interaction.guild.id, 
          AcceptedCategory: acceptedCatergory.id,
          DeclinedCategory: declinedCatergory.id,
          ApplicationCategory: applicationCategory.id,
          AcceptRole: acceptRole.id,
        });

            const setup = new MessageEmbed()
            .setColor("GREEN")
            .setTitle('✅ Successfully setup the application system')
            .setDescription(`You have successfully setup the application system for ${interaction.guild.name} With the following options
            \n**Accepted Category**: ${acceptedCatergory.name}\n**Declined Category**: ${declinedCatergory.name}\n
            **Application Category**: ${applicationCategory.name}\n**Accept Role**: ${acceptRole.name}`)

        return interaction.reply({
          embeds: [setup],
        });
      } else {

        await Schema.findOneAndUpdate({
            GuildID: interaction.guild.id, 
            AcceptedCategory: acceptedCatergory.id,
            DeclinedCategory: declinedCatergory.id,
            ApplicationCategory: applicationCategory.id,
            AcceptRole: acceptRole.id,
        });

        const edited = new MessageEmbed()
        .setColor("GREEN")
        .setTitle('✅ Successfully setup the application system')
        .setDescription(`You have successfully setup the application system for ${interaction.guild.name} With the following options
        \n**Accepted Category**: ${acceptedCatergory.name}\n**Declined Category**: ${declinedCatergory.name}\n
        **Application Category**: ${applicationCategory.name}\n**Accept Role**: ${acceptRole.name}`)

        return interaction.reply({
            embeds: [edited],
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
};