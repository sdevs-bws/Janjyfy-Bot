const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require("discord.js");
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);

module.exports = {
    name: "unlock",
    description: "unlocks a channel",
    options: [
        {
            name: "channel",
            type: 7,
            description: "the channel to unlock",
            required: true
        },
        {
            name: "reason",
            type: 3,
            description: "the reason for unlocking the channel",
            required: true
        }
    ],

    run: async (client, interaction) => {
         const channel = interaction.options.getChannel("channel");
         const reason = interaction.options.getString("reason");

         if (!channel) {
            interaction.reply({ content: `❌ | You must provide a \`\`channel\`\` to unlock!`, ephemeral: true });
            return;
         }
         if (!reason) {
            interaction.reply({ content: `❌ | You must provide a \`\`reason\`\` to unlock this channel!`, ephemeral: true });
            return;
         }
         if (channel.permissionsFor(interaction.guild.roles.everyone).has(PermissionsBitField.Flags.SendMessages)) {
            interaction.reply({ content: `❌ | That channel is already \`\`unlocked\`\`!`, ephemeral: true });
            return;
         }

         channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: true,
        });
         interaction.reply({ content: `✅ | I have \`\`unlocked\`\` the channel: ${channel} for reason: \`\`${reason}\`\``, ephemeral: true });

         const mog_log_embed = new EmbedBuilder()
         .setTitle("Unlock Channel")
         .setColor(colors.main)
         .setDescription(`\`\`${interaction.user.tag}\`\` has \`\`unlocked\`\` the channel: \`\`${channel}\`\` for reason: \`\`${reason}\`\``)
         .setFooter({ text: `Unlocked by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
    }
};