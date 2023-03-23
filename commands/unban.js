const { MessageEmbed } = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
  name: 'unban',
  description: 'Unbans a user from a server',
  options: [
    {
        name: "userid",
        type: 3,
        description: "the user to be unbanned",
        required: true
    },
    {
        name: "reason",
        type: 3,
        description: "the reason for the unban",
        required: true
    }
],
   run: async (client, interaction) => {
    const user = interaction.options.getString("userid");
    const reason = interaction.options.getString("reason");

    if (!user) {
        interaction.reply(`❌ | I could not \`\`find\`\` that user!`)
        return;
    }
    if (!reason) {
        interaction.reply(`❌ | You must provide a \`\`reason\`\` for the unban!`)
        return;
    }
    
    await interaction.guild.members.unban(user, reason);
    interaction.reply(`✅ | Successfully unbanned \`\`${user.tag}\`\` for Reason: \`\`${reason}\`\` from the Server!`);

    const mog_log_embed = new MessageEmbed()
        .setTitle("Unban")
        .setColor(colors.main)
        .setDescription(`\`\`${interaction.user.tag}\`\` has been \`\`unbanned\`\` from the server for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Unbanned by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
 }
};