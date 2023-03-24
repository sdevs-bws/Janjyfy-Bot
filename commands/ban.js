const { EmbedBuilder } = require("discord.js");
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
    const user = interaction.options.getMember("user");
    const member = interaction.channel.guild.members.cache.get(user.id);
    const reason = interaction.options.getString("reason");

    if (!member) {
        interaction.reply({ content: "❌ | I could not \`\`find\`\` that user!", ephemeral: true });
        return;
    }
    if (!reason) {
        interaction.reply({ content: "❌ | Please provide a \`\`reason\`\` for the ban!", ephemeral: true });
        return;
    }
    if (!member.bannable) {
        interaction.reply({ content: "❌ | I could not \`\`ban\`\` that user!", ephemeral: true });
        return;
    }
    
    await member.ban({ reason: reason });
    interaction.reply({ content: `✅ | \`\`${member.user.tag}\`\` has been \`\`banned\`\` from the server for reason: \`\`${reason}\`\``, ephemeral: true });

    const mog_log_embed = new EmbedBuilder()
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