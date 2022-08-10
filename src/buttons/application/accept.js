const { Client, Intents, collector } = require(`discord.js`);
const fs = require("fs");
const config = require(`${process.cwd()}/src/config/janjy.config.js`);
const moment = require("moment");
const { MessageEmbed, MessageActionRow, MessageButton,} = require("discord.js");
const Schema = require(`${process.cwd()}/src/schemas/application.js`);

module.exports.run = async (client, interaction) => {

  const data = await Schema.findOne({
      GuildID: interaction.guild.id,
    });
  
    const guild = interaction.guild; // The guild the interaction is in
    let requesterId = interaction.message.embeds[0].footer.text; // The ID of the user who requested the application
    let requester = guild.members.cache.get(requesterId) || guild.members.fetch(requesterId).catch(()=>{}) || false // The user who requested the application

    const Role = data.AcceptRole; // The role to give the user

    if (!Role) return; // If there is no role to give the user then return

    const trial = interaction.guild.roles.cache.get(Role);  // The role to be given once an application is accepted

    const accepted = new MessageEmbed()  // The embed to be sent to the requester
    .setColor('GREEN')  // The color of the embed
    .setTitle(`✅ Application Accepted`)  // The title of the embed
    .setDescription(`Welcome to the team ${requester.displayName}!\n`) // The description of the embed
    .setThumbnail(requester.user.displayAvatarURL({ dynamic: true })) // The thumbnail of the embed
    .addField('Accepted At:', `${moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a")}`) // The field of the embed
    .addField('Accepted By:', `${interaction.user.tag}`, true) // The field of the embed
    .setFooter({text: `${requester.user.tag} | ${requester.id}`, iconURL: requester.user.displayAvatarURL({ dynamic: true })}) // The footer of the embed
    .setTimestamp();

    const done = new MessageEmbed()
    .setColor('GREEN')
    .setTitle(`✅ Application Accepted This application will be archived in 15 seconds`) 

    let Accept = new MessageButton()
    .setCustomId("Accept")
    .setLabel("Accept Application")
    .setEmoji("✅")
    .setDisabled(true)
    .setStyle("SECONDARY");                 //DO NOT CHANGE ANY OF THESE BUTTONS

    let Deny = new MessageButton()
    .setCustomId("Decline")
    .setLabel("Decline Application")
    .setEmoji("❌")
    .setDisabled(true)
    .setStyle("SECONDARY");

  const row = new MessageActionRow().addComponents(
    Accept,
    Deny,
  );
    
    const up = interaction.message.embeds[0]; // The embed of the application

    if(requester){  // If the requester exists
      requester.roles.add(trial); // Give the requester the trial role
      requester.send({embeds: [accepted]}).catch(()=>{}); // Send the accepted embed to the requester
      interaction.update({embeds: [up], components: [row] }).then(()=>{ // Update the interaction with the accepted embed and the action row
        interaction.followUp({embeds: [done], ephemeral: true}); // Send the done embed to the person that accepted them
        }) 
      setTimeout(() => { // After 15 seconds
        interaction.channel.setParent(data.AcceptedCategory) // Move the channel to the accepted archive
      }, 15000); 
    }

};
module.exports.help = {
  custom_id: `Accept`,  // The ID of the command DO NOT CHANGE
};