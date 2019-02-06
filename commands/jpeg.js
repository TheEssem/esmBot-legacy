const request = require("request");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to add more JPEG!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    gm(request(image)).setFormat("jpg").quality(1).stream((error, stdout) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      message.channel.send({
        files: [{
          attachment: stdout,
          name: "morejpeg.jpg"
        }]
      });
    });
  }
};

exports.aliases = ["needsmorejpeg", "jpegify", "magik2", "morejpeg", "jpg"];
