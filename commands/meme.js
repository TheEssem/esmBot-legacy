const request = require("request").defaults({ encoding: null });

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  // get list of messages in channel
  const messageList = message.channel.messages.sort(function(a, b) {
    return b.createdTimestamp - a.createdTimestamp;
  }).array();
  const [topText, bottomText] = args.join(" ").split(",").map(elem => elem.trim());
  let attachmentFound = false;
  for (let i = 0; i < messageList.length; i++) {
    if (messageList[i].attachments.array().length !== 0) {
      message.channel.startTyping();
      const attachmentsList = messageList[i].attachments.array();
      const fileExtension = attachmentsList[0].file.name.split(".").slice(-1)[0].toLowerCase();
      // check if file is an image or not
      if (fileExtension !== "png" && fileExtension !== "jpg" && fileExtension !== "jpeg") {
        message.channel.stopTyping();
        return message.reply("you need to upload a PNG or JPG file to generate a meme!");
      }
      // download the image
      if (bottomText !== undefined) {
        const memeOutput = request(`https://memegen.link/custom/${topText.split(" ").join("_")}/${bottomText.split(" ").join("_")}.jpg?alt=${attachmentsList[0].url}&font=impact&watermark=none`);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: memeOutput,
            name: "meme.png"
          }]
        });
      } else {
        const memeOutput = request(`https://memegen.link/custom/${topText.split(" ").join("_")}.jpg?alt=${attachmentsList[0].url}&font=impact&watermark=none`);
        message.channel.stopTyping();
        message.channel.send({
          files: [{
            attachment: memeOutput,
            name: "meme.png"
          }]
        });
      }
      attachmentFound = true;
      break;
    }
  }
  // only happens if there aren't any attachments in the channel
  if (!attachmentFound) {
    return message.reply("you need to upload a PNG or JPG file to generate a meme!");
  }
};
