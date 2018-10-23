const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (message.mentions.users.first() !== undefined) {
    const userEmbed = new MessageEmbed()
      .setTitle(message.mentions.users.first().tag)
      .setThumbnail(message.mentions.users.first().displayAvatarURL({size: 1024}))
      .setColor(0xFF0000)
      .setDescription(`🔢 **ID:** \`${message.mentions.users.first().id}\`\n` +
      `📛 **Nickname:** ${message.mentions.members.first().displayName}\n` +
      `🤖 **Bot:** ${message.mentions.users.first().bot ? "Yes" : "No"}\n` +
      `🗓️ **Joined Discord on:** \`${message.mentions.users.first().createdAt}\`\n` +
      `💬 **Joined this server on:** \`${message.mentions.members.first().joinedAt}\`\n` +
      `ℹ️ **Status:** ${message.mentions.users.first().presence.status}\n` +
      `🎮 **Playing:** ${message.mentions.users.first().presence.activity ? message.mentions.users.first().presence.activity.name : "Nothing"}\n`);
    message.channel.send(userEmbed);
  } else {
    const userEmbed = new MessageEmbed()
      .setTitle(message.author.tag)
      .setThumbnail(message.author.displayAvatarURL({size: 1024}))
      .setColor(0xFF0000)
      .setDescription(`🔢 **ID:** \`${message.author.id}\`\n` +
      `📛 **Nickname:** ${message.member.displayName}\n` +
      `🤖 **Bot:** ${message.author.bot ? "Yes" : "No"}\n` +
      `🗓️ **Joined Discord on:** \`${message.author.createdAt}\`\n` +
      `💬 **Joined this server on:** \`${message.member.joinedAt}\`\n` +
      `ℹ️ **Status:** ${message.author.presence.status}\n` +
      `🎮 **Playing:** ${message.author.presence.activity ? message.author.presence.activity.name : "Nothing"}\n`);
    message.channel.send(userEmbed);
  }
};

exports.aliases = ["user"];
