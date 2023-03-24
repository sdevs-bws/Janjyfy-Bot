const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
const warnModel = require(`${process.cwd()}/database/models/warn_model.js`);

module.exports = {
    name: "warn",
    description: "warn a user",
    options: [
        {
            name: "user",
            description: "the user to warm",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "the reason for the warning",
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
         const user = interaction.options.getUser("user");
         const reason = interaction.options.getString("reason");
         const member = interaction.guild.members.cache.get(user.id);
         const guild = interaction.guild;

         if (!user) {
            interaction.reply({ content: "❌ | You have to \`\`provide\`\` a user!", ephemeral: true });
            return;
         }
         if (!reason) {
            interaction.reply({ content: "❌ | You have to \`\`provide\`\` a reason!", ephemeral: true });
            return;
         }
         if (user.id === interaction.user.id) {
            interaction.reply({ content: "❌ | You cant \`\`warn\`\` yourself.", ephemeral: true });
            return;
         }
         if (user.id === client.user.id) {
            interaction.reply({ content: "❌ | You cant \`\`warn\`\` me.", ephemeral: true });
            return;
         }
         if (user.id === guild.ownerID) {
            interaction.reply({ content: "❌ | You cant \`\`warn\`\` the server owner.", ephemeral: true });
            return;
         }

         const components = new ActionRowBuilder()
         .addComponents(
             new ButtonBuilder()
             .setCustomId('secondary')
             .setLabel(`Warned in ${guild.name}`)
             .setStyle('Secondary')
             .setDisabled(true)
         )
         const warn = new EmbedBuilder()
         .setColor(colors.main)
         .setTitle(`🛑 | ${user.tag} has been warned`)
         .setDescription(`\`\`${user.tag}\`\` has been \`\`warned\`\` by \`\`${interaction.user.tag}\`\` for reason: \`\`${reason}\`\``)
         .setFooter({ text: config.footer });

         const warn2 = new EmbedBuilder()
         .setColor(colors.main)
         .setTitle(`🛑 | You have been warned`)
         .setDescription(`\`\`${user.tag}\`\` has been \`\`warned\`\` by \`\`${interaction.user.tag}\`\` for reason: \`\`${reason}\`\``)
         .setFooter({ text: config.footer });

         await new warnModel({
            userId: user.id,
            guildId: guild.id,
            moderatorId: interaction.user.id,
            reason: reason,
            timestamp: Date.now(),
        }).save();
         interaction.channel.send({ embeds: [warn] });
         interaction.reply({ content: `✅ | \`\`${user.tag}\`\` has been \`\`warned\`\` for reason: \`\`${reason}\`\``, ephemeral: true });
         user.send({ embeds: [warn2], components: [components] }).catch(() => {});

         const mog_log_embed = new EmbedBuilder()
        .setTitle("Warn")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` has been \`\`warned\`\` for reason: \`\`${reason}\`\``)
        .setFooter({ text: `Warned by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
}
};