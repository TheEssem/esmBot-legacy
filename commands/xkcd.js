const request = require("request");
const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length === 0) {
    request({ uri: "http://xkcd.com/info.0.json", json: true }, (error, response, body) => {
      if (error) throw new Error(error);
      const xkcdEmbed = new MessageEmbed()
        .setColor(0xFF0000)
        .setTitle(body.safe_title)
        .setURL(`https://xkcd.com/${body.num}`)
        .setDescription(body.alt)
        .setImage(body.img);
      message.channel.send(xkcdEmbed);
    });
  } else {
    if (args[0].match(/^\d+$/)) {
      request({ uri: `http://xkcd.com/${args[0]}/info.0.json`, json: true }, (error, response, body) => {
        if (error) throw new Error(error);
        const xkcdEmbed = new MessageEmbed()
          .setColor(0xFF0000)
          .setTitle(body.safe_title)
          .setURL(`https://xkcd.com/${body.num}`)
          .setDescription(body.alt)
          .setImage(body.img);
        message.channel.send(xkcdEmbed);
      });
    } else {
      request({ uri: "http://xkcd.com/info.0.json", json: true }, (error, response, body) => {
        if (error) throw new Error(error);
        const xkcdEmbed = new MessageEmbed()
          .setColor(0xFF0000)
          .setTitle(body.safe_title)
          .setURL(`https://xkcd.com/${body.num}`)
          .setDescription(body.alt)
          .setImage(body.img);
        message.channel.send(xkcdEmbed);
      });
    }
  }
};

exports.aliases = [];
