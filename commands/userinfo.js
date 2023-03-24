const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: 'userinfo',
    description: 'Get info about a user',
    options: [
        {
            name: "user",
            description: "The user to get the info of",
            type: 6,
            required: true
        },
        {
            name: "reason",
            description: "The reason for this action",
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(user.id);
        const requestedBy = interaction.user;
        const guild = interaction.guild;
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(member.user.createdAt.getTime() / 1000) * 1000;

        const embed = new EmbedBuilder()
        .setColor(colors.main)
        .setTitle(`💫 ${member.user.tag}'s Informations`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields([
            { name: `<a:lop:939967931348037653> ID`, value: `\`\`\`yaml\n${member.user.id}\`\`\``, inline: false },
            { name: `<a:768934598583123979:939881115806748682> Username`, value: `\`\`\`yaml\n${member.user.username}\`\`\``, inline: false },
            { name: `<a:768934598583123979:939881115806748682> Nickname`, value: `\`\`\`yaml\n${member.nickname ? member.nickname : "None"}\`\`\``, inline: false },
            { name: `<a:768934598583123979:939881115806748682> Account Created`, value: `\`\`\`yaml\n${moment(member.user.createdAt).format("DD/MM/YYYY")}\`\`\``, inline: false },
            { name: `<a:768934598583123979:939881115806748682> Status`, value: `\`\`\`yaml\n${member ? member.presence.status.replace("dnd", "Do Not Disturb").replace("idle", "Idle").replace("online", "Online").replace("offline", "Offline") : "Offline"}\`\`\``, inline: false },
            { name: `<a:768934598583123979:939881115806748682> Bot`, value: `\`\`\`yaml\n${member.user.bot ? "Yes" : "No"}\`\`\``, inline: false },
        ])
        .setFooter({ text: config.footer })
        .setTimestamp();

        const components = new ActionRowBuilder()
         .addComponents(
             new ButtonBuilder()
             .setCustomId('secondary')
             .setLabel(`Message sent from ${guild.name}`)
             .setStyle('Secondary')
             .setDisabled(true)
         )

        if (!user) {
            interaction.reply({ content: "❌ | You have to \`\`provide\`\` a user!", ephemeral: true });
            return;
        }
        if (!reason) {
            interaction.reply({ content: "❌ | You have to \`\`provide\`\` a reason!", ephemeral: true });
            return;
        }

        requestedBy.send({ embeds: [embed], components: [components] }).catch(() => {
            interaction.reply({ content: "❌ | I could not \`\`send\`\` a message to you!", ephemeral: true });
        });

        interaction.reply({ content: `✅ | I have sent you a message with the user's info!`, ephemeral: true });
    }
};
