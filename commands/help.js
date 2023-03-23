const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
//const Messages = require("discord-msg");
const colors = require(`${process.cwd()}/janjy.colors.js`);
const config = require(`${process.cwd()}/janjy.config.js`);

module.exports = {
    name: "help",
    description: "Learn about bot commands.",
    options: [],
    run: async (client, interaction) => {
      const _components = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel('Support Server')
        .setEmoji("✅")
        .setURL(`${config.supportDiscord}`)
        .setStyle('LINK'),
        new MessageButton()
        .setLabel('Invite Bot')
        .setEmoji("❤️")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        .setStyle('LINK')
      )


        const embed = new MessageEmbed()
        .setTitle('Hey, if you need help type /help command')
        //.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setColor(colors.main)
        .setDescription(`**<a:arrows:1012771355659341834> My Prefix:** \`${config.prefix}\``)
        .addField(`<:Discord_Bots1:1012770508967776316> Bot Info:`, `>>> \`/botinfo\` : \`show the information about the bot\`\n\`/invite\` : \`give you the bot invite link\`\n\`/support\` : \`give you the bot support server\``)
        .addField(`<:config_H4K:1012770512738463874> Config:`, `>>> \`/modlog enable\` : \`Enables the modlog system\`\n\`/modlog disable\` : \`disables the modlog system\``)
        .addField(`<a:r_info:1012770515582193664> Informations:`, `>>> \`/userinfo\` : \`Gives you more detailed information about a user\``)
        // yeah i know pretty long lines
        .addField(`<:mod:1012770510800695398> Moderation:`, `>>> \`/ban\` : \`Bans a user from the system!\`\n\`/give-role\` : \`Gives a user a specific role\`\n\`/kick\` : \`Kicks a user from the server\`\n\`/lock\` : \`Locks a channel\`\n\`/mute\` : \`Mutes a user on the server\`\n\`/nickname\` : \`Changes the nickname of a user\`\n\`/purge\` : \`Purges a specific amount of messages in a channel\`\n\`/remove-role\` : \`Removes a role from a specific user\`\n\`/unban\` : \`Unbans a user from the server\`\n\`/unlock\` : \`Unlocks a locked channel on the server\`\n\`/unmute\` : \`Unmutes a user on the server\`\n\`/warn\` : \`Warn a specific user on the server\``)
        .setFooter({ text: config.footer });

              await interaction.reply({
                embeds: [ embed ],
                components: [_components]
              });
        }
    };