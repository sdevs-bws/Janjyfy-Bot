const Discord = require('discord.js');
const config = require('../config/stoneclane.config.js');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("Sending request to the Projects Database...")
  let projects = new Discord.MessageEmbed()
    .setTitle("Stoneclane Development's Projects")
    .setColor('#000000')	
    .addField("GiveAways", `https://giveaways-bot.com`, true)
    .addField("TrestHost", `https://tresthost.com`, true)
    .addField("Zerion (Soon!)", `https://zerion.codes`, true)
    .addField("Stoneclane.xyz", `https://stoneclane.xyz`, true)
    .addField("Viridian.ml", `https://viridian.ml`, true)
    .addField("Praxive (Soon!)", `https://praxive.sdevs.org`, true)
    .addField("Stoneclane Studios", `https://discord.gg/5t6S5T53Kd`, true)
    .setFooter({ text: config.footer });
     m.delete()
  message.reply({ content: " ", embeds: [projects] })
}