const dotbeat = require("dotbeat");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.send(`🕑 The current time in beats is ${dotbeat.get("string", true)}.`);
};

exports.aliases = ["beats"];
