const { MessageEmbed } = require("discord.js");
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
    const user = interaction.options["_hoistedOptions"].find(_o => _o.type == "USER").user;
    const member = interaction.channel.guild.members.cache.get(user.id);
    const reason = interaction.options.getString("reason");

    if (!member) {
        interaction.reply("❌ | I could not find that user!")
        return;
    }
    if (!reason) {
        interaction.reply("❌ | You must provide a reason for the kick!")
        return;
    }
    if (!member.kickable) {
        interaction.reply("❌ | I cannot kick that user!")
        return;
    }
    
    await member.kick( reason );
    interaction.reply(`✅ | Successfully kicked \`\`${member.user.tag}\`\` for Reason: \`\`${reason}\`\` from the Server!`);

    const mog_log_embed = new MessageEmbed()
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