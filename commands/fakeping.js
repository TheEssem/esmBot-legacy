exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/ping.opus", message);
};

exports.aliases = ["notification", "notif"];
