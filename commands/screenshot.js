const request = require("request").defaults({ encoding: null });
const isURL = require("is-url");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length !== 0) {
    message.channel.startTyping();
    const url = isURL(args[0]) ? args[0] : `http://${args[0]}`;
    const screenshot = request(`https://image.thum.io/get/width/1920/crop/675/maxAge/1/noanimate/${url}`);
    const screenshotEmbed = new MessageEmbed()
      .setColor(0xFF0000)
      .setTitle(url)
      .setURL(url)
      .attachFiles([{
        attachment: screenshot,
        name: "screenshot.png"
      }])
      .setImage("attachment://screenshot.png");
    message.channel.stopTyping();
    message.channel.send(screenshotEmbed);
  } else {
    message.reply("you need to provide a URL to generate a screenshot!");
  }
};

exports.aliases = ["ss", "webshot"];
