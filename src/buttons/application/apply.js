const { Client, Intents, collector } = require(`discord.js`);
const fs = require("fs");
const Schema = require(`${process.cwd()}/src/schemas/application.js`);
const { MessageEmbed, MessageActionRow, MessageButton,} = require("discord.js");

module.exports.run = async (client, interaction) => {

    const data = await Schema.findOne({
        GuildID: interaction.guild.id,
      });

      const nodata = new MessageEmbed()
      .setColor("RED")
      .setTitle("❌ No Application Data can be found");
  
    if (!data) return interaction.reply({ embeds: [nodata], ephemeral: true });

       const question = data.Questions.map(x => `${x}`);

       const noquestions = new MessageEmbed()
       .setColor("RED")
       .setTitle("❌ No Application Questions can be found for this server\nPlease run \`/application add <question>\` to add a question");

        //if there is no questions in the database return with the noquestions embed
        if (question.length === 0) return interaction.reply({ embeds: [noquestions], ephemeral: true });


    let Accept = new MessageButton()
    .setCustomId("Accept")
    .setLabel("Accept Application")
    .setEmoji("✅")
    .setStyle("SECONDARY");

    let Deny = new MessageButton()
    .setCustomId("Decline")
    .setLabel("Decline Application")
    .setEmoji("❌")
    .setStyle("SECONDARY");

  const row = new MessageActionRow().addComponents(
    Accept,
    Deny,
  );

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id == interaction.user.id;

        const started = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`✅ Started Application in your DM's`)

        await interaction.reply({embeds: [started], ephemeral: true});

        const dmMsg = await interaction.user.send(question[collectCounter++]);

        const collector = dmMsg.channel.createMessageCollector({
            max: question.length,
            filter
        });

        collector.on("collect", () => {
            if (collectCounter < question.length) {
                dmMsg.channel.send(question[collectCounter++]);
            } else {
                dmMsg.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor('GREEN')
                        .setTitle(`✅ Application has been submitted!`)
                    ]
                });
                collector.stop("fulfilled");
            }
        });

        const ApplicationCat = interaction.guild.channels.cache.get(data.ApplicationCategory);


        collector.on("end", async (collected, reason) => {
            if (reason === "fulfilled") {

                interaction.guild.channels.create(`Application-${interaction.user.id}`).then(async m => {
                    await m.setParent(ApplicationCat.id);
                    await m.lockPermissions();
                    await m.setTopic(`Application channel for ${interaction.user}`)
        
                    let index = 1;
                const mappedResponses = collected
                    .map((msg) => {
                      return `**${index++}) ${question[endCounter++]}**\n > \`${msg.content}\``;
                    })
                .join("\n");
        
                const embed = new MessageEmbed()
                .setAuthor({ name: `${interaction.user.tag}-(${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL({ dyamic: true })})
                .setTitle("New Team Application!")
                .setDescription(mappedResponses)
                .setColor('AQUA')
                .setFooter({ text: `${interaction.user.id}`})
                .setTimestamp()
        
            m.send({ content: `@here, A new application has been submitted by ${interaction.user}.`, embeds: [embed], components: [row]});
                })

            }
        });

};
module.exports.help = {
  custom_id: `Apply`,
};