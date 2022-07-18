const { MessageEmbed, MessageAttachment } = require("discord.js");
let flags = require(`${process.cwd()}/src/functions/flags.js`);

module.exports = {
  name: 'pinfo',
  description: 'Shows information about the user',
  async execute(interaction, bot) {
    const target = interaction.options.get("user") || interaction
    let attachment;
    let format;
    let url;

    url = target.user.displayAvatarURL({ dynamic: true });
    format = url.slice(url.lastIndexOf('.') + 1);
    attachment = new MessageAttachment(`https://api.no-api-key.com/api/v2/round?image=${url}`, `avatar.${format}`);
    if (format == 'webp') {
      url = target.user.displayAvatarURL({ format: 'png' });
      format = url.slice(url.lastIndexOf('.') + 1);
      attachment = new MessageAttachment(`https://api.no-api-key.com/api/v2/round?image=${url}`, `avatar.${format}`);
    }

    const joined = Date.now() - new Date(target.member.joinedTimestamp);

    const rankarray = [
      `Noob :monkey: (1 - 60 days)`,
      `Intermediate :fire: (61 - 181 days)`,
      `King :crown: (182 - 364 days)`,
      `GODLIKE :dizzy: (1+ year)`,
    ];

    let rank = 0

    if (joined > 1000 * 60 * 60 * 24 * 364) {
      rank = 3
    } else if (joined > 1000 * 60 * 60 * 24 * 181) {
      rank = 2
    } else if (joined > 1000 * 60 * 60 * 24 * 60) {
      rank = 1
    } else {
      rank = 0
    }

    const embed = new MessageEmbed()
      .setTitle(`${target.user.username}\'s Profile:`)
      .setThumbnail(`attachment://avatar.${format}`)
      .addFields(
        { name: 'Server Rank', value: `${rankarray[rank]}`, inline: true },
        { name: 'Joined', value: `<t:${Math.floor(target.member.joinedAt / 1000)}:R>`, inline: true },
        { name: 'Join Date', value: `<t:${Math.floor(target.member.joinedAt / 1000)}>`, inline: true },
        { name: 'Users Badges', value: await flags(target), inline: true },
        { name: 'Created Date', value: `<t:${Math.floor(target.user.createdTimestamp / 1000)}>`, inline: true },
        { name: 'Server role', value: `${target.member.roles.highest.name}`, inline: true },
      )
      .setFooter(`ID: ${target.user.id}`)
      .setColor(14140103);
    
       interaction.reply({ embeds: [embed], files: [attachment] });
  },
};
