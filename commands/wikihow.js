const request = require("request");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.channel.startTyping();
  request({
    url: "https://www.reddit.com/r/disneyvacation.json",
    headers: {
      "User-Agent": "linux:io.github.theessemcraft.esmbot:v1.0.0 (by u/TheEssemCraft)"
    },
    json: true
  }, (error, response, body) => {
    if (error) throw new Error(error);
    message.channel.stopTyping();
    message.channel.send({
      files: [{
        attachment: body.data.children.random().data.url,
        name: "wikihow.png"
      }]
    });
  });
};
