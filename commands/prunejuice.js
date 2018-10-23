exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/prunejuice.opus", message);
};

exports.aliases = ["juice", "grandma"];
