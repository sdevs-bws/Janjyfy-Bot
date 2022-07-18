const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

module.exports = {
    token: "OTk1Mzk3MjYzMTMwMTEyMDgx.GESS9E.nZApjARH1nMNnFmA9F7V13FotLDXOhrqq-lhTo",
    mongo: "mongodb+srv://janjyfy:hi@cluster0.vur7v.mongodb.net/?retryWrites=true&w=majority",
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
  
