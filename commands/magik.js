const request = require("request");
const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  // get list of messages in channel
  const messageList = message.channel.messages.sort(function(a, b) {
    return b.createdTimestamp - a.createdTimestamp;
  }).array();
  let attachmentFound = false;
  for (let i = 0; i < messageList.length; i++) {
    if (messageList[i].attachments.array().length !== 0) {
      const attachmentsList = messageList[i].attachments.array();
      const fileExtension = attachmentsList[0].file.name.split(".").slice(-1)[0].toLowerCase();
      // check if file is an image or not
      if (fileExtension !== "png" && fileExtension !== "jpg" && fileExtension !== "jpeg") {
        return message.reply("you need to upload a PNG or JPG file to add magik!");
      }
      const processMessage = await message.channel.send("⚙️ Processing...");
      gm(request(attachmentsList[0].url)).size((error, size) => {
        if (error) throw new Error(error);
        gm(request(attachmentsList[0].url)).out("-liquid-rescale", `${size.width * 0.5}x${size.height * 0.5}`).strip().stream((error, stdout) => {
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
      attachmentFound = true;
      break;
    }
  }
  if (!attachmentFound) {
    return message.reply("you need to upload a PNG or JPG file to add magik!");
  }
};
