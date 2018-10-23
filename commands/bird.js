const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  request({ uri: "http://shibe.online/api/birds", json: true }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: body[0],
        name: "bird.png"
      }]
    });
  });
};

exports.aliases = ["birb", "birds", "birbs"];
