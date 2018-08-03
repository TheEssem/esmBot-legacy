/*const request = require("request");
const tempy = require("tempy");
const gm = require("gm").subClass({
  imageMagick: true
});*/

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  message.reply("this command is currently disabled due to arising technical issues.");
  /*const image = client.getImage(message);
  const magikTemp = tempy.file({ extension: "png" });
  const magikOutput = tempy.file({ extension: "png" });
  if (image !== undefined) {
    const processMessage = await message.channel.send("⚙️ Processing... This might take a while");
    gm(request(image)).size((error, size) => {
      if (error) throw new Error(error);
      gm(request(image)).out("-liquid-rescale", `${size.width * 0.5}x${size.height * 0.5}`).strip().write(magikTemp, (error) => {
        if (error) throw new Error(error);
        gm(magikTemp).out("-liquid-rescale", `${size.width * 1.5}x${size.height * 1.5}`).strip().write(magikOutput, async (error) => {
          if (error) throw new Error(error);
          await message.channel.send({
            files: [{
              attachment: magikOutput,
              name: "magik.png"
            }]
          });
          processMessage.delete();
        });
      });
    });
  } else {
    message.reply("you need to provide a PNG or JPEG file to add some magik!");
  }*/
};
