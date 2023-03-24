const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const colors = require(`${process.cwd()}/janjy.colors.js`);
const config = require(`${process.cwd()}/janjy.config.js`);
const modlogModel = require(`${process.cwd()}/database/models/modlog.js`);

module.exports = {
    name: 'nickname',
    description: 'Changes your or the nickname from a other person',
    options: [
        {
            name: 'user',
            description: 'The user you want to change the nickname of',
            type: 6,
            required: true
        },
        {
            name: 'nickname',
            description: 'The nickname you want to change to',
            type: 3,
            required: true
        },
        {
            name: 'reason',
            description: 'The reason you want to change the nickname',
            type: 3,
            required: true
       }
    ],

    run: async (client, interaction) => {
        const user = interaction.options.getUser("user");
        const member = interaction.channel.guild.members.cache.get(user.id);
        const nickname = interaction.options.getString("nickname");
        const reason = interaction.options.getString("reason");
        const guild = interaction.guild;

        const guildBot = guild.members.cache.get(client.user.id);

        if (!member) {
            interaction.reply({ content: "❌ | I could not \`\`find\`\` that user!", ephemeral: true });
            return;
        }
        if (member.id == client.user.id) {
            interaction.reply({ content: "❌ | I can't change my own nickname!", ephemeral: true });
            return;
        }
        if (member.nickname == nickname) {
            interaction.reply({ content: "❌ | That user already has that nickname!", ephemeral: true });
            return;
        }
        if (nickname.length > 32) {
            interaction.reply({ content: "❌ | That \`\`nickname\`\` is too long!", ephemeral: true });
            return;
        }
        if (guildBot.roles.highest.position <= member.roles.highest.position) {
            interaction.reply({ content: "❌ | I can't change that users nickname because my role is lower than the users role!", ephemeral: true });
            return;
        }
        
        member.setNickname(nickname, reason);
        interaction.reply({ content: `✅ | \`\`${member.user.tag}\`\` has been \`\`changed\`\` to \`\`${nickname}\`\` for reason: \`\`${reason}\`\``, ephemeral: true });

        const components = new ActionRowBuilder()
         .addComponents(
             new ButtonBuilder()
             .setCustomId('secondary')
             .setLabel(`Nickname Changed in ${guild.name}`)
             .setStyle('Secondary')
             .setDisabled(true)
         )

        const embed = new EmbedBuilder()
        .setColor(colors.main)
        .setTitle("💫 | Nickname Changed")
        .setDescription("Your nickname got changed to \`\`" + nickname + "\`\` by \`\`" + interaction.user.tag + "\`\`!")
        .addFields([
            { name: "Reason", value: reason, inline: false }
        ])
        .setFooter({ text: config.footer });

        member.send({ embeds: [embed], components: [components] }).catch(() => {});

        const mog_log_embed = new EmbedBuilder()
        .setTitle("Nickname Changed")
        .setColor(colors.main)
        .setDescription(`\`\`${member.user.tag}'s\`\` nickname got changed to \`\`${nickname}\`\` by \`\`${interaction.user.tag}\`\`!`)
        .setFooter({ text: `Nickname Changed by: ${interaction.user.tag}` });

    const modlog = await modlogModel.findOne({ Guild: interaction.guild.id });
    if (modlog.Enabled == true) {
        interaction.guild.channels.cache.get(modlog.Channel).send({ embeds: [mog_log_embed] });
    }
    if (modlog.Enabled == false) {
        return;
    }
    }
};