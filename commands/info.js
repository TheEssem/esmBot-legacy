const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const infoEmbed = new MessageEmbed()
    .setAuthor("esmBot Info/Credits", "https://cdn.discordapp.com/avatars/429305856241172480/49717613bd5c8302e59f615f5ef70fe5.png")
    .setColor(0xFF0000)
    .addField("📝 Credits:", "Bot by **Essem#9261**\n" +
      "Icon by **STEELDOESATHING#1391**")
    .addField("⚙️ APIs/Libraries:", "[Discord.js](https://discord.js.org)\n" +
      "[memegen.link](https://memegen.link/)\n" +
      "[base64.js](https://www.npmjs.com/package/js-base64)\n" +
      "[dotbeat](https://www.npmjs.com/package/dotbeat)\n" +
      "[gm](https://www.npmjs.com/package/gm)\n" +
      "[moment](https://www.npmjs.com/package/moment)\n" +
      "[enmap](https://www.npmjs.com/package/enmap)\n" +
      "[uax11](https://www.npmjs.com/package/uax11)")
    .addField("✅ Official Server:", "https://discord.gg/jBxxkPZ")
    .addField("💻 Source Code:", "https://github.com/TheEssemCraft/esmBot");
  message.channel.send(infoEmbed);
};
