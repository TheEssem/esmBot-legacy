const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  if (image !== undefined) {
    message.channel.startTyping();
    gm(request(image)).colorspace("RGB").modulate(125, 300, 105).contrast(-5).setFormat("jpg").quality(1).stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "deepfry.jpg"
        }]
      });
    });
  } else {
    message.reply("you need to provide a PNG or JPEG file to deep fry!");
  }
};
