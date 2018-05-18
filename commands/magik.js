const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const image = client.getImage(message);
  if (image !== undefined) {
    const processMessage = await message.channel.send("⚙️ Processing... This might take a while");
    gm(request(image)).size((error, size) => {
      if (error) throw new Error(error);
      gm(request(image)).out("-liquid-rescale", `${size.width * 0.5}x${size.height * 0.5}`).strip().stream((error, stdout) => {
        if (error) throw new Error(error);
        gm(stdout).out("-liquid-rescale", `${size.width * 1.5}x${size.height * 1.5}`).strip().stream(async (error, stdout) => {
          await message.channel.send({
            files: [{
              attachment: stdout,
              name: "magik.png"
            }]
          });
          processMessage.delete();
        });
      });
    });
  } else {
    message.reply("you need to provide a PNG or JPEG file to add some magik!");
  }
};
