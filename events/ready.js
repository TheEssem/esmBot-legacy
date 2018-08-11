const fs = require("fs");
const path = require("path");

module.exports = async client => {
  // clean the cache
  fs.readdir("./cache", (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join("./cache", file), err => {
        if (err) throw err;
      });
    }
  });

  // per-server configs
  client.guilds.forEach(guild => {
    if (!client.settings.has(guild.id)) {
      client.settings.set(guild.id, client.defaults);
    }
  });

  // hello world
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // bot is gamer confirmed
  (function activityChanger() {
    client.user.setActivity(`${client.config.activityMessages.random()} | @esmBot help`, { type: "PLAYING" });
    setTimeout(activityChanger, 1800000);
  })();
};
