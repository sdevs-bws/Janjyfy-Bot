const discord = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
    name: "give-role",
    description: "give a role to a user",
    options: [
        {
            name: "user",
            type: 6,
            description: "the user to give the role to",
            required: true
        },
        {
            name: "role",
            type: 8,
            description: "the role to give the user",
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

        if (user.roles.cache.has(role.id)) {
            interaction.reply("❌ | That user already has that role!");
            return;
        }

        if (!role) {
            interaction.reply("❌ | I cant \`\`find\`\` that role!");
            return;
        }

        await user.roles.add(role);
        interaction.reply(`✅ | I have given the role called ${role} to \`\`${member.user.tag}\`\``);

        const mog_log_embed = new discord.MessageEmbed()
        .setTitle("Give-Role")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` was been \`\`given\`\` the role: ${role} for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Gaved by: ${interaction.user.tag}` || undefined });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
    }
}