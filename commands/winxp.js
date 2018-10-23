exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/winxp.opus", message);
};

exports.aliases = ["windows", "xp"];
