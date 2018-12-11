const ytSearch = require("youtube-search");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (args.length === 0) {
    message.reply("you need to provide something to search for!");
  } else {
    message.channel.startTyping();
    const opts = {
      maxResults: 1,
      key: client.config.googleKey
    };
    ytSearch(args.join(" "), opts, (error, results) => {
      if (error) throw new Error(error);
      message.channel.stopTyping();
      if (results[0].kind === "youtube#channel") {
        message.channel.send(`${client.emojis.get("314349922885566475")} **${results[0].title.replace("*", "\\*")}**\n${results[0].link}`);
      } else if (results[0].kind === "youtube#playlist") {
        message.channel.send(`${client.emojis.get("314349922885566475")} **${results[0].title.replace("*", "\\*")}**\nCreated by **${results[0].channelTitle.replace("*", "\\*")}**\n${results[0].link}`);
      } else {
        message.channel.send(`${client.emojis.get("314349922885566475")} **${results[0].title.replace("*", "\\*")}**\nUploaded by **${results[0].channelTitle.replace("*", "\\*")}** on **${results[0].publishedAt.split("T")[0]}**\n${results[0].link}`);
      }
    });
  }
};

exports.aliases = ["yt", "video"];
