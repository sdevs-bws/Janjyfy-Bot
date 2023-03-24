module.exports = (client) => {
    const guild = client.guilds.cache.get("892311236878934016");

    if (guild) {
        console.log("[✅] Im in the " + guild.name + " !");
    } else {
        console.log("[❌] I'm not in the C4 Emoji Server so the Emojis wont load! Add me to the server by sending a message to JanjyTapYT#0001! || https://discord.gg/TbuHeKFUnJ");
    }

    console.log("[ℹ️] If the Emojis dont load, please check if i have the 'USE_EXTERNAL_EMOJIS' permission in the server!");
};