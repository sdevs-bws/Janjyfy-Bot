const { Discord, Client } = require("discord.js");
const client = new Client({ intents: 32767 });

module.exports = {
    token: "TOKEN GOES HERE!",
    mongo: "MONGO GOES HERE!",
    owners: ["679407120743137300", "530832812274614303"],
    footer: "Bot made with ❤️ and ☕ by JanjyTapYT & Stoneclane Development",

    statuses: {

        status1: {
            name: `/help | Janjyfy Bot`,
            type: "WATCHING",
            url: "https://twitch.tv/#"
        },

        status2: {
            name: `Made with ❤️ by JanjyTapYT & Stoneclane Development`,
            type: "PLAYING",
            url: "https://twitch.tv/#"
        },
    }
}
  
