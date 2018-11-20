module.exports = async (client) => {
  // per-server configs/tags
  client.guilds.forEach(guild => {
    if (!client.settings.has(guild.id)) {
      client.settings.set(guild.id, client.defaults);
    }
    if (!client.tags.has(guild.id)) {
      client.tags.set(guild.id, client.tagDefaults);
    }
  });

  // hello world
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // bot is gamer confirmed
  (function activityChanger() {
    client.user.setPresence({ activity: { name: `${client.config.activityMessages.random()} | @esmBot help`, type: "PLAYING" }, status: "dnd" });
    setTimeout(activityChanger, 900000);
  })();
};
