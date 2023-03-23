const { MessageEmbed } = require("discord.js");
const colors = require(`${process.cwd()}/janjy.colors.js`);
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);

module.exports = {
  name: 'ban',
  description: 'Bans a user from a server',
  options: [
    {
        name: "user",
        type: 6,
        description: "the user to be banned",
        required: true
    },
    {
        name: "reason",
        type: 3,
        description: "the reason for the ban",
        required: true
    }
],
   run: async (client, interaction) => {
    const user = interaction.options["_hoistedOptions"].find(_o => _o.type == "USER").user;
    const member = interaction.channel.guild.members.cache.get(user.id);
    const reason = interaction.options.getString("reason");

    if (!member) {
        interaction.reply("❌ | I could not \`\`find\`\` that user!")
        return;
    }
    if (!reason) {
        interaction.reply("❌ | You must provide a \`\`reason\`\` for the ban!")
        return;
    }
    if (!member.bannable) {
        interaction.reply("❌ | I cannot \`\`ban\`\` that user!")
        return;
    }
    
    await member.ban({ reason: reason });
    interaction.reply(`✅ | Successfully banned \`\`${member.user.tag}\`\` for Reason: \`\`${reason}\`\` from the Server!`);

    const mog_log_embed = new MessageEmbed()
        .setTitle("Ban")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` has been \`\`banned\`\` from the server for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Banned by: ${interaction.user.tag}` || undefined });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
 }
};