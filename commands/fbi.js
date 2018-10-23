exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/fbi.opus", message);
};

exports.aliases = ["openup"];
