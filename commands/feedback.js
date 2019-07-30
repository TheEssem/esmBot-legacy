const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  if (Array.isArray(args) && args.length) {
    const feedbackChannel = client.guilds.get("592399417676529688").channels.get("592429860769497098");
    const feedbackEmbed = new MessageEmbed()
      .setAuthor("esmBot Feedback", client.user.displayAvatarURL())
      .setColor(0xFF0000)
      .setThumbnail(message.author.displayAvatarURL())
      .setTimestamp()
      .addField("👥 Author:", message.author.tag)
      .addField("👪 Server:", message.guild.name)
      .addField("💬 Message:", args.join(" "));
    feedbackChannel.send(feedbackEmbed);
    message.reply("your feedback has been sent!");
  } else {
    message.reply("you need to provide some feedback to send!");
  }
};

exports.aliases = ["request", "report", "complain", "compliment"];
