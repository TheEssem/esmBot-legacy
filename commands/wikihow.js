const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  request({
    url: "https://hargrimm-wikihow-v1.p.mashape.com/images?count=1",
    headers: {
      "X-Mashape-Key": client.config.mashapeKey,
      "Accept": "application/json"
    },
    json: true
  }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: body["1"],
        name: "wikihow.png"
      }]
    });
  });
};

exports.aliases = ["wiki"];
