const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const colors = require(`${process.cwd()}/janjy.colors.js`);
const config = require(`${process.cwd()}/janjy.config.js`);

module.exports = {
    name: "help",
    description: "Learn about bot commands.",
    options: [],
    run: async (client, interaction) => {
      const _components = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel('Support Server')
        .setEmoji("✅")
        .setURL(`${config.supportDiscord}`)
        .setStyle('Link'),
        new ButtonBuilder()
        .setLabel('Invite Bot')
        .setEmoji("❤️")
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        .setStyle('Link')
      )


        const embed = new EmbedBuilder()
        .setTitle('Hey, if you need help type /help command')
        //.setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
        .setColor(colors.main)
        .setDescription(`**<a:768934598583123979:939881115806748682> My Prefix:** \`/\``)
        .addFields([
          { name: `<a:IconBot:951665482245763193> Bot Info:`, value: `\`/botinfo\` : \`show the information about the bot\`\n\`/invite\` : \`give you the bot invite link\`\n\`/support\` : \`give you the bot support server\``, inline: false },
          { name: `<a:settings_2:939814005067890739> Config:`, value: `\`/modlog enable\` : \`Enables the modlog system\`\n\`/modlog disable\` : \`disables the modlog system\``, inline: false },
          { name: `<a:IconCreditCard:951665483118162001> Informations:`, value: `\`/userinfo\` : \`Gives you more detailed information about a user\``, inline: false },
          { name: `<:moderator:939881268064165898> Moderation:`, value: `\`/ban\` : \`Bans a user from the system!\`\n\`/give-role\` : \`Gives a user a specific role\`\n\`/kick\` : \`Kicks a user from the server\`\n\`/lock\` : \`Locks a channel\`\n\`/mute\` : \`Mutes a user on the server\`\n\`/nickname\` : \`Change the nickname of a user\`\n\`/purge\` : \`Purge messages from a channel\`\n\`/unban\` : \`Unbans a user from the system!\`\n\`/unmute\` : \`Unmutes a user on the server\``, inline: false },
        ])
        .setFooter({ text: config.footer });

              await interaction.reply({
                embeds: [ embed ],
                components: [_components]
              });
        }
    };