const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const dev = client.users.resolve(client.config.botOwner).tag;
  const artist = client.users.resolve("401980971517214723").tag;
  const infoEmbed = new MessageEmbed()
    .setAuthor("esmBot Info/Credits", client.user.avatarURL())
    .setColor(0xFF0000)
    .addField("📝 Credits:", `Bot by **${dev}**\n` +
      `Icon by **${artist}**`)
    .addField("👪 Total Users:", client.users.size)
    .addField("💬 Total Servers:", client.guilds.size)
    .addField("✅ Official Server:", "https://discord.gg/vfFM7YT")
    .addField("💻 Source Code:", "https://github.com/TheEssem/esmBot");
  message.channel.send(infoEmbed);
};

exports.aliases = ["botinfo", "credits"];
