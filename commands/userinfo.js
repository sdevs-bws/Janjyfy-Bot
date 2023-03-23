const discord = require('discord.js');
const config = require(`${process.cwd()}/janjy.config.js`);
const colors = require(`${process.cwd()}/janjy.colors.js`);
const emojis = require(`${process.cwd()}/janjy.emojis.js`);
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);
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
        const user = interaction.options["_hoistedOptions"].find(_o => _o.type == "USER").user;
        const reason = interaction.options.getString("reason");
        const member = interaction.guild.members.cache.get(user.id);
        const requestedBy = interaction.user;
        const guild = interaction.guild;
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(member.user.createdAt.getTime() / 1000) * 1000;

        const embed = new discord.MessageEmbed()
        .setColor(colors.main)
        .setTitle(`💫 ${member.user.tag}'s Informations`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField(`${emojis.id} ID`, member.id, true)
        .addField(`${emojis.username} Username`, member.user.tag, true)
        .addField(`${emojis.nickname} Nickname`, member.nickname ? member.nickname : "No Nickname!", true)
        .addField(`${emojis.account_created} Account Created`, `<t:${moment(timestamp).unix()}>`, true)
        .addField(`${emojis.status} Status`, member.presence.status, true)
        .addField(`${emojis.bot} Bot`, member.user.bot ? "Yes" : "No", true)
        .setFooter(config.footer)
        .setTimestamp();

        const components = new discord.MessageActionRow()
         .addComponents(
             new discord.MessageButton()
             .setCustomId('secondary')
             .setLabel(`Message sent from ${guild.name}`)
             .setStyle('SECONDARY')
             .setDisabled(true)
         )

        if (!user) {
            interaction.reply(`❌ | I cant \`\`find\`\` that user!`);
            return;
        }
        if (!reason) {
            interaction.reply(`❌ | You have to \`\`provide\`\` a reason!`);
            return;
        }

        requestedBy.send({ embeds: [embed], components: [components] });
        interaction.reply(`✅ | ${requestedBy} I have \`\`sent\`\` you a \`\`DM\`\` with all the \`\`informations\`\` about \`\`${member.user.tag}\`\`!`);

        const mog_log_embed = new discord.MessageEmbed()
        .setTitle("Userinfo")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}\`\` has been requested the user informations of \`\`${member.user.tag}\`\` with Reason: \`\`${reason}\`\``)
        .setFooter({ text: `Requested Informations By: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ where: { Guild: interaction.guild.id }})
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
    }
};
