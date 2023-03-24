const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
  name: 'kick',
  description: 'kick a user from the server',
  options: [
    {
        name: "user",
        type: 6,
        description: "the user to be kicked",
        required: true
    },
    {
        name: "reason",
        type: 3,
        description: "the reason for the kick",
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
        interaction.reply({ content: "❌ | Please provide a reason for the kick!", ephemeral: true });
        return;
    }
    if (!member.kickable) {
        interaction.reply({ content: "❌ | I cannot \`\`kick\`\` that user!", ephemeral: true });
        return;
    }
    
    await member.kick( reason );
    interaction.reply({ content: `✅ | \`\`${member.user.tag}\`\` has been \`\`kicked\`\` from the server for reason: \`\`${reason}\`\``, ephemeral: true });

    const mog_log_embed = new EmbedBuilder()
        .setTitle("Kick")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` has been \`\`kicked\`\` from the server for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Kicked by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
   }
};