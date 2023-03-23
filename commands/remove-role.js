const discord = require("discord.js");
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
            interaction.reply("❌ | I cant \`\`find\`\` that user!");
            return;
        }

        if (!user.roles.cache.has(role.id)) {
            interaction.reply("❌ | That user does not \`\`have\`\` the role!");
            return;
        }

        if (!role) {
            interaction.reply("❌ | I cant \`\`find\`\` that role!");
            return;
        }

        await user.roles.remove(role);
        interaction.reply(`✅ | I have removed the role called ${role} from \`\`${member.user.tag}\`\``);

        const mog_log_embed = new discord.MessageEmbed()
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