const request = require("request");
const tempy = require("tempy");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  const woowCrop = tempy.file({extension: "png"});
  const woowFlip = tempy.file({extension: "png"});
  if (image !== undefined) {
    message.channel.startTyping();
    gm(request.get(image)).gravity("North").crop(0, "50%").strip().write(woowCrop, (error) => {
      if (error) throw new Error(error);
      gm(woowCrop).flip().strip().write(woowFlip, (error) => {
        if (error) throw new Error(error);
        gm(woowCrop).append(woowFlip).strip().stream((error, stdoutFinal) => {
          if (error) throw new Error(error);
          message.channel.stopTyping();
          message.channel.send({
            files: [{
              attachment: stdoutFinal,
              name: "woow.png"
            }]
          });
        });
      });
    });
  } else {
    message.reply("you need to provide a PNG or JPEG file to mirror!");
  }
};
