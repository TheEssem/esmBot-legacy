const request = require("request");
const tempy = require("tempy");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  const hoohCrop = tempy.file({extension: "png"});
  const hoohFlip = tempy.file({extension: "png"});
  message.channel.startTyping();
  gm(request.get(image)).gravity("South").crop(0, "50%").strip().write(hoohCrop, (error) => {
    if (error) throw new Error(error);
    gm(hoohCrop).flip().strip().write(hoohFlip, (error) => {
      if (error) throw new Error(error);
      gm(hoohFlip).append(hoohCrop).strip().stream((error, stdoutFinal) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdoutFinal,
            name: "hooh.png"
          }]
        });
      });
    });
  });
};
