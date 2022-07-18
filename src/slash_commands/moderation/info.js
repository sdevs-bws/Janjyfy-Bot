const { MessageEmbed, MessageAttachment } = require("discord.js");
const Replace = require(`${process.cwd()}/src/functions/embedReplace.js`);
const Embeds = require(`${process.cwd()}/src/resources/embeds.json`);

module.exports = {
  name: 'info',
  description: 'View a users information',
  async execute(interaction, bot, { muteSchema, kickSchema, banSchema }) {

    const target = interaction.options.get("user") || interaction

    const MissingPermission = new Replace(Embeds.MissingPermission, { PERMISSION: '``MANAGE_GUILD``', PUNISH: 'view other users' });
    if (interaction.options.get("user")?.value && !interaction.member.permissions.has("MANAGE_GUILD")) return interaction.reply({ content: null, embeds: [MissingPermission], ephemeral: true });

    const NotFound = new Replace(Embeds.NotFound, { USER: target.user });
    if (!target.member) return interaction.reply({ content: null, embeds: [NotFound], ephemeral: true });

    const [Mutes, Kicks, Bans, StaffMutes, StaffKicks, StaffBans] = Promise.all([
      muteSchema.find({ UserID: target.user.id, GuildID: interaction.guild.id }),
      kickSchema.find({ UserID: target.user.id, GuildID: interaction.guild.id }),
      banSchema.find({ UserID: target.user.id, GuildID: interaction.guild.id }),
      muteSchema.find({ StaffID: target.user.id, GuildID: interaction.guild.id }),
      kickSchema.find({ StaffID: target.user.id, GuildID: interaction.guild.id }),
      banSchema.find({ StaffID: target.user.id, GuildID: interaction.guild.id }),
    ]);

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

    const embed = new MessageEmbed()
      .setTitle(`${target.user.username}\'s Information:`)
      .setThumbnail(`attachment://avatar.${format}`)
      .setDescription(`*General* \n__ID:__ ${target.user.id} \n\n__Created At:__ <t:${Math.floor(target.user.createdTimestamp / 1000)}> \n__Joined At:__ <t:${Math.floor(target.member.joinedAt / 1000)}> \n\n *Moderation* \n __Mutes:__ ${Mutes.length || 0}\n __Kicks:__ ${Kicks.length || 0}\n __Bans:__ ${Bans.length || 0}\n \n *Info* \n __Staff Mutes__: ${StaffMutes.length} \n __Staff Kicks:__ ${StaffKicks.length} \n __Staff Bans:__ ${StaffBans.length} `)
      .setFooter(interaction.guild.name, interaction.guild.iconURL())
      .setColor(14140103)
      .setTimestamp();

    interaction.reply({ embeds: [embed], files: [attachment] });
  },
};