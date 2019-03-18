const fs = require("fs");

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

  // create list of banned users if it doesn't exist
  fs.access("bannedusers.json", fs.constants.F_OK, (error) => {
    if (error) fs.writeFile("bannedusers.json", "[]", "UTF8", (error) => {
      if (error) throw new Error(error);
    });
  });

  // hello world
  client.logger.log("info", `[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // bot is gamer confirmed
  (function activityChanger() {
    client.user.setPresence({ activity: { name: `${client.config.activityMessages.random()} | @esmBot help`, type: "PLAYING" }, status: "dnd" });
    setTimeout(activityChanger, 900000);
  })();
};
