exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  client.playSound("./assets/audio/mail.opus", message);
};

exports.aliases = ["yougotmail", "youvegotmail", "aol"];
