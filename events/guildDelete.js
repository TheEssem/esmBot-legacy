module.exports = (client, guild) => {
  client.logger.cmd(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
  client.settings.delete(guild.id);
  client.tags.delete(guild.id);
};
