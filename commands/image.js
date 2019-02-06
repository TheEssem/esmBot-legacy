const GoogleImages = require("google-images");
const { MessageEmbed } = require("discord.js");
const { Embeds } = require("discord-paginationembed");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  // if (!message.guild.me.permissions.has("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply("I don't have the `Manage Messages` permission!");
  if (!message.guild.me.permissions.has("ADD_REACTIONS") && !message.channel.permissionsFor(message.guild.me).has("ADD_REACTIONS")) return message.reply("I don't have the `Add Reactions` permission!");
  if (!message.guild.me.permissions.has("EMBED_LINKS") && !message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.reply("I don't have the `Embed Links` permission!");
  if (args.length === 0) {
    message.reply("you need to provide something to search for!");
  } else {
    const embeds = [];
    const imageSearch = new GoogleImages(client.config.cseID, client.config.googleKey);
    imageSearch.search(args.join(" "), { safe: "high" }).then(images => {
      for (const [i, value] of images.entries()) {
        embeds.push(new MessageEmbed().setFooter(`Page ${i + 1} of ${images.length}`).setImage(value.url));
      }
      if (embeds.length != 0) {
        return new Embeds()
          .setNavigationEmojis({
            back: "◀",
            jump: "🔢",
            forward: "▶",
            delete: "🗑"
          })
          .showPageIndicator(false)
          .setAuthorizedUsers([message.author.id])
          .setChannel(message.channel)
          .setArray(embeds)
          .setAuthor(message.member.displayName, message.author.displayAvatarURL())
          .setPage(1)
          .setTitle("Search Results")
          .setColor(0xFF0000)
          .build();
      } else {
        return message.reply("I couldn't find any results!");
      }
    }).catch(error => { throw new Error(error); });
  }
};

exports.aliases = ["im", "photo", "img"];
