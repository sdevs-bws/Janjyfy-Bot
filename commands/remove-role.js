const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
    name: "remove-role",
    description: "remove a role from a user",
    options: [
        {
            name: "user",
            type: 6,
            description: "the user to remove the role from",
            required: true
        },
        {
            name: "role",
            type: 8,
            description: "the role to remove from the user",
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
      
        const role = interaction.options.getRole("role");
        const user = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(user.id);

        if (!member) {
            interaction.reply({ content: "❌ | I could not \`\`find\`\` that user!", ephemeral: true });
            return;
        }

        if (!user.roles.cache.has(role.id)) {
            interaction.reply({ content: "❌ | That user does not have that role!", ephemeral: true });
            return;
        }

        if (!role) {
            interaction.reply({ content: "❌ | I could not \`\`find\`\` that role!", ephemeral: true });
            return;
        }

        await user.roles.remove(role);
        interaction.reply({ content: `✅ | I have removed the role: ${role} from the user: ${user}`, ephemeral: true });

        const mog_log_embed = new EmbedBuilder()
        .setTitle("Remove-Roles")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` was been \`\`removed\`\` the role: ${role} for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Removed by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
    }
}