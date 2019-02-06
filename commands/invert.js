const request = require("request");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to invert!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    gm(request(image)).negative().stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "invert.png"
        }]
      });
    });
  }
};

exports.aliases = ["inverse", "negate", "negative"];
