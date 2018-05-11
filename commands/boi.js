const fs = require("fs");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (message.member.voiceChannel) {
    const connection = await message.member.voiceChannel.join();
    const dispatcher = connection.play(fs.createReadStream("./assets/audio/boi.opus"), {
      type: "ogg/opus"
    });
    dispatcher.on("error", () => {
      message.member.voiceChannel.leave();
      console.error;
    });
    dispatcher.on("finish", () => {
      dispatcher.destroy();
      message.member.voiceChannel.leave();
    });
  } else {
    message.channel.send("You need to be in a voice channel first!");
  }
};
