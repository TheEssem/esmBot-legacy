const request = require("request");
const gm = require("@tohru/gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = await client.getImage(message).catch(error => {
    message.reply("you need to provide an image to tile!");
    console.log(error);
  });
  if (image !== undefined) {
    message.channel.startTyping();
    gm(request(image)).command("montage").out("-duplicate").out(24).tile("5x5").geometry("+0+0").stream((error, stdout) => {
      if (error) throw new Error(error);
      gm(stdout).resize("800x800>").stream((error, stdoutFinal) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: stdoutFinal,
            name: "tile.png"
          }]
        });
      });
    });
  }
};

exports.aliases = ["wall2"];
