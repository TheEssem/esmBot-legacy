const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  request({ uri: "https://catfact.ninja/fact", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send(`🐱 **Did you know?** ${body.fact}`);
  });
};

exports.aliases = ["kittyfact"];
