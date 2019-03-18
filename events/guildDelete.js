module.exports = (client, guild) => {
  client.logger.log("info", `[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
  client.settings.delete(guild.id);
  client.tags.delete(guild.id);
};
