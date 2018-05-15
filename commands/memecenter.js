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
      message.channel.startTyping();
      const attachmentsList = messageList[i].attachments.array();
      const fileRawName = attachmentsList[0].file.name.split(".").slice(0)[0];
      const fileExtension = attachmentsList[0].file.name.split(".").slice(-1)[0].toLowerCase();
      const memecenterWatermark = "./assets/images/memecenterwatermark.png";
      // check if file is an image or not
      if (fileExtension !== "png" && fileExtension !== "jpg" && fileExtension !== "jpeg") {
        message.channel.stopTyping();
        return message.reply("you need to upload a PNG or JPG file to add a memecenter watermark!");
      }
      gm(request(attachmentsList[0].url)).size({ bufferStream: true }, (error, size) => {
        if (error) throw new Error(error);
        const originalWidth = size.width;
        gm(request(attachmentsList[0].url)).out(memecenterWatermark).background("#FFFFFF").gravity("East").out("-smush").out("-9").strip().write(`./cache/${fileRawName}memecenter.png`, (error) => {
          if (error) throw new Error(error);
          gm(`./cache/${fileRawName}memecenter.png`).size({ bufferStream: true }, (error, size) => {
            if (error) throw new Error(error);
            const memecenterWidth = size.width;
            if (originalWidth !== memecenterWidth) {
              const cropWidth = memecenterWidth - originalWidth;
              gm(`./cache/${fileRawName}memecenter.png`).gravity("West").chop(cropWidth, 0).strip().stream((error, stdoutFixed) => {
                if (error) throw new Error(error);
                message.channel.stopTyping();
                message.channel.send({
                  files: [{
                    attachment: stdoutFixed,
                    name: "memecenter.png"
                  }]
                });
              });
            } else {
              message.channel.stopTyping();
              message.channel.send({
                files: [{
                  attachment: `./cache/${fileRawName}memecenter.png`,
                  name: "memecenter.png"
                }]
              });
            }
          });
        });
      });
      attachmentFound = true;
      break;
    }
  }
  if (!attachmentFound) {
    return message.reply("you need to upload a PNG or JPG file to add a memecenter watermark!");
  }
};
