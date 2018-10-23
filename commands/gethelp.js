exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/gethelp.opus", message);
};

exports.aliases = ["getsomehelp", "stopit", "stop"];
