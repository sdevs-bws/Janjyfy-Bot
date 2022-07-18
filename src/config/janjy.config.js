const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

module.exports = {
    token: "TOKEN GOES HERE!",
    mongo: "MONGO GOES HERE!",
    owners: ["679407120743137300", "530832812274614303"],
    footer: "Bot made with ❤️ and ☕ by Stoneclane Development",

    statuses: {

        status1: {
            name: `Made with ❤️ by JanjyTapYT & Stoneclane Development`,
            type: "PLAYING",
            url: "https://twitch.tv/#"
        },

        status2: {
            name: `${client.guilds.cache.size} Servers | ${client.users.cache.size} Users | ${client.channels.cache.size} Channels`,
            type: "WATCHING",
            url: "https://twitch.tv/#"
        }
    }
}
  
