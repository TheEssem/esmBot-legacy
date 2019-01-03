exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/bus.opus", message);
};

exports.aliases = ["noyelling", "busyell"];
