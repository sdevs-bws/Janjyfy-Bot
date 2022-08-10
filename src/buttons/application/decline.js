const { Client, Intents, collector } = require(`discord.js`);
const fs = require("fs");
const config = require(`${process.cwd()}/src/config/janjy.config.js`);
const moment = require("moment");
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports.run = async (client, interaction) => {

  const data = await Schema.findOne({
    GuildID: interaction.guild.id,
  });

    const guild = interaction.guild; // The guild the interaction is in

    let requesterId = interaction.message.embeds[0].footer.text; // The ID of the user who requested the application

    let requester = guild.members.cache.get(requesterId) || guild.members.fetch(requesterId).catch(()=>{}) || false // The user who requested the application

    const closed = data.DeclinedCategory; // The channel to archive accepted applications

    const declined = new MessageEmbed() // The embed to be sent to the requester
    .setColor('RED')
    .setTitle(`❌ Application Rejected`)
    .setDescription(`Sorry ${requester.displayName} your application has been rejected.`)
    .setFooter({text: `${requester.user.tag} | ${requester.id}`, iconURL: requester.user.displayAvatarURL({ dynamic: true })})
    .setTimestamp();

    const done = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`❌ Application Rejected, Archving in 15 seconds`)

    let Accept = new MessageButton()
    .setCustomId("Accept")
    .setLabel("Accept Application")
    .setEmoji("✅")
    .setDisabled(true)
    .setStyle("SECONDARY");

    let Deny = new MessageButton()
    .setCustomId("Decline")
    .setLabel("Deny Application")
    .setEmoji("❌")
    .setDisabled(true)
    .setStyle("SECONDARY");

  const row = new MessageActionRow().addComponents(
    Accept,
    Deny,
  );
    
    const up = interaction.message.embeds[0];

    if(requester){
      requester.send({embeds: [declined]}).catch(()=>{});
      interaction.update({embeds: [up], components: [row] }).then(()=>{
        interaction.followUp({embeds: [done], ephemeral: true});
        })
      setTimeout(() => {
        interaction.channel.setParent(closed); // Move the channel to the archive category
      }, 15000);
    }

};
module.exports.help = {
  custom_id: `Decline`,
};