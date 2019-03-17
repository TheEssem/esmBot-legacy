const request = require("request");
const tempy = require("tempy");
const fs = require("fs");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to make a \"Scott the Woz TV\" meme!");
    console.log(error);
  });
  const imageFile = tempy.file({extension: "png"});
  if (image !== undefined) {
    message.channel.startTyping();
    const template = "./assets/images/scott.png";
    const downloadImage = request.get(image).pipe(fs.createWriteStream(imageFile));
    downloadImage.on("finish", () => {
      gm(template).out("-gravity").out("Center").out("(").out(imageFile).out("-virtual-pixel").out("transparent").out("-resize").out("415x234!").out("+distort").out("Perspective").out("0,0 129,187 415,0 517,182 415,234 517,465 0,234 132,418").out("-geometry").out("-110+83").out(")").out("-composite").stream((error, stdout) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdout,
            name: "scott.png"
          }]
        });
      });
    });
  }
};

exports.aliases = ["woz, tv, porn"];
