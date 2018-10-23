exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/boat.opus", message);
};

exports.aliases = ["tape", "flextape", "phil", "philswift"];
