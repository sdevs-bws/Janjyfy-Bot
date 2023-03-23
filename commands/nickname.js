const discord = require('discord.js');
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
        const user = interaction.options["_hoistedOptions"].find(_o => _o.type == "USER").user;
        const member = interaction.channel.guild.members.cache.get(user.id);
        const nickname = interaction.options.getString("nickname");
        const reason = interaction.options.getString("reason");
        const guild = interaction.guild;

        if (!member) {
            interaction.reply("❌ | I could not \`\`find\`\` that user!");
            return;
        }
        if (member.id == client.user.id) {
            interaction.reply("❌ | I cant \`\`change\`\` my own nickname!");
            return;
        }
        if (member.nickname == nickname) {
            interaction.reply("❌ | That user \`\`already\`\` has that nickname!");
            return;
        }
        if (nickname.length > 32) {
            interaction.reply("❌ | That \`\`nickname\`\` is too long!");
            return;
        }
        if (reason.length > 512) {
            interaction.reply("❌ | That \`\`reason\`\` is too long!");
            return;
        }
        
        member.setNickname(nickname, reason);
        interaction.reply("✅ | I have changed the nickname of \`\`" + member.user.tag + "\`\` to \`\`" + nickname + "\`\`!");

        const components = new discord.MessageActionRow()
         .addComponents(
             new discord.MessageButton()
             .setCustomId('secondary')
             .setLabel(`Nickname Changed in ${guild.name}`)
             .setStyle('SECONDARY')
             .setDisabled(true)
         )

        const embed = new discord.MessageEmbed()
        .setColor(colors.main)
        .setTitle("💫 | Nickname Changed")
        .setDescription("Your nickname got changed to \`\`" + nickname + "\`\` by \`\`" + interaction.user.tag + "\`\`!")
        .addField("Reason", reason)
        .setFooter({ text: config.footer });

        member.send({ embeds: [embed], components: [components] });

        const mog_log_embed = new discord.MessageEmbed()
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