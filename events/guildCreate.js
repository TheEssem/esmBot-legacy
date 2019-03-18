module.exports = (client, guild) => {
  client.logger.log("info", `[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  client.settings.set(guild.id, client.defaults);
  client.tags.set(guild.id, client.tagDefaults);
};
