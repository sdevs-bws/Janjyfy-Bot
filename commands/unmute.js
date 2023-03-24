const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
    name: "unmute",
    description: "unmute a user on the server",
    options: [
        {
            name: "user",
            type: 6,
            description: "the user to be unmuted",
            required: true
        },
        {
            name: "reason",
            type: 3,
            description: "the reason for the mute",
            required: true
        }
    ],

    run: async (client, interaction) => {
    
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(user.id);
        const muteRole = guild.roles.cache.find(role => role.name === "Muted");

        if (!muteRole) {
            interaction.reply({ content: "❌ | I could not \`\`find\`\` the mute role!", ephemeral: true });
            return;
        }
        if (!member) {
            interaction.reply({ content: "❌ | I could not \`\`find\`\` that user!", ephemeral: true });
            return;
        }
        if (!member.roles.cache.has(muteRole.id)) {
            interaction.reply({ content: "❌ | That user is not muted!", ephemeral: true });
            return;
        }
        member.roles.remove(muteRole.id).then(() => {
            interaction.reply({ content: `✅ | I have unmuted the user: ${user}`, ephemeral: true });
        })

        const mog_log_embed = new EmbedBuilder()
        .setTitle("Unmute")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` has been \`\`unmuted\`\` on the server for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Unmuted by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
    }
}