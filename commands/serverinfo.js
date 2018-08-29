const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const serverEmbed = new MessageEmbed()
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL({size: 1024}))
    .setColor(0xFF0000)
    .setDescription(`🔢 **ID:** \`${message.guild.id}\`\n` +
    `👤 **Owner:** ${message.guild.owner.user.tag}\n` +
    `🗺️ **Region:** ${message.guild.region}\n` +
    `🗓️ **Created on:** \`${message.guild.createdAt}\`\n` +
    `👥 **Users:** ${message.guild.memberCount}\n` +
    `💬 **Channels:** ${message.guild.channels.size}\n` +
    `😃 **Emojis:** ${message.guild.emojis.map(e => e).join("")}`);
  message.channel.send(serverEmbed);
};
