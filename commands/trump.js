const request = require("request");
const tempy = require("tempy");
const fs = require("fs");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to make a Trump meme!");
    console.log(error);
  });
  const imageFile = tempy.file({extension: "png"});
  if (image !== undefined) {
    message.channel.startTyping();
    const template = "./assets/images/trump.png";
    const downloadImage = request.get(image).pipe(fs.createWriteStream(imageFile));
    downloadImage.on("finish", () => {
      gm(template).out("-background").out("none").out("-gravity").out("South").out("(").out("-clone").out("0").out("(").out(imageFile).out("-virtual-pixel").out("transparent").out("-resize").out("365x179!").out("+distort").out("Perspective").out("0,0 207,268 365,0 548,271 365,179 558,450 0,179 193,450").out(")").out("-geometry").out("-25-1").out("-composite").out(")").out("+swap").out("-composite").stream((error, stdout) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdout,
            name: "trump.png"
          }]
        });
      });
    });
  }
};

exports.aliases = [];
