const { MessageEmbed } = require("discord.js");
const { Embeds } = require("discord-paginationembed");

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  switch (args[0]) {
    case "add":
      if (args[1] !== undefined) {
        if (args[1] === "list") return message.reply("you can't override the tag list!");
        if (args[1] === "add") return message.reply("you can't override the ability to add tags!");
        if (args[1] === "edit") return message.reply("you can't override the ability to edit tags!");
        if (args[1] === "remove" || args[1] === "delete") return message.reply("you can't override the ability to delete tags!");
        if (args[1] === "random") return message.reply("you can't override the ability to choose a random tag!");
        if (client.tags.has(message.guild.id, args[1])) {
          message.reply("this tag already exists!");
        } else {
          const tagContent = args.slice(2).join(" ");
          if (tagContent.length !== 0 && tagContent !== undefined) {
            client.tags.set(message.guild.id, { content: tagContent, author: message.author.id }, args[1]);
            message.reply(`the tag \`${args[1]}\` has been added!`);
          } else if (message.attachments.array().length !== 0) {
            client.tags.set(message.guild.id, { content: message.attachments.array()[0].url, author: message.author.id }, args[1]);
            message.reply(`the tag \`${args[1]}\` has been added!`);
          } else {
            message.reply("you need to specify the content of the tag!");
          }
        }
      } else {
        message.reply("you need to specify the name of the tag!");
      }
      break;
    case "delete":
    case "remove":
      if (args[1] !== undefined) {
        if (client.tags.has(message.guild.id, args[1])) {
          if (client.tags.get(message.guild.id, args[1]).author === message.author.id || message.author.id === client.config.botOwner || message.member.permissions.has("MANAGE_MESSAGES")) {
            client.tags.delete(message.guild.id, args[1]);
            message.reply(`the tag \`${args[1]}\` has been removed!`);
          } else {
            message.reply("you don't own this tag!");
          }
        } else {
          message.reply("this tag doesn't exist!");
        }
      } else {
        message.reply("you need to specify the name of the tag!");
      }
      break;
    case "edit":
      if (args[1] !== undefined) {
        if (client.tags.has(message.guild.id, args[1])) {
          if (client.tags.get(message.guild.id, args[1]).author === message.author.id || message.author.id === client.config.botOwner) {
            const tagContent = args.slice(2).join(" ");
            if (tagContent.length !== 0 && tagContent !== undefined) {
              client.tags.set(message.guild.id, tagContent, `${args[1]}.content`);
              message.reply(`the tag \`${args[1]}\` has been edited!`);
            } else if (message.attachments.array().length !== 0) {
              client.tags.set(message.guild.id, { content: message.attachments.array()[0].url, author: message.author.id }, args[1]);
              message.reply(`the tag \`${args[1]}\` has been added!`);
            } else {
              message.reply("you need to specify the content of the tag!");
            }
          } else {
            message.reply("you don't own this tag!");
          }
        } else {
          message.reply("this tag doesn't exist!");
        }
      } else {
        message.reply("you need to specify the name of the tag!");
      }
      break;
    case "list":
      // if (!message.guild.me.permissions.has("MANAGE_MESSAGES") && !message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) return message.reply("I don't have the `Manage Messages` permission!");
      if (!message.guild.me.permissions.has("ADD_REACTIONS") && !message.channel.permissionsFor(message.guild.me).has("ADD_REACTIONS")) return message.reply("I don't have the `Add Reactions` permission!");
      if (!message.guild.me.permissions.has("EMBED_LINKS") && !message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.reply("I don't have the `Embed Links` permission!");
      var pageSize = 15;
      var embeds = [];
      var groups = Object.keys(client.tags.get(message.guild.id)).map((item, index) => {
        return index % pageSize === 0 ? Object.keys(client.tags.get(message.guild.id)).slice(index, index + pageSize) : null;
      }).filter((item) => { return item; });
      for (const [i, value] of groups.entries()) {
        embeds.push(new MessageEmbed().setFooter(`Page ${i + 1} of ${groups.length}`).setDescription(value.join("\n")));
      }
      new Embeds()
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
        .setTitle("Tag List")
        .setColor(0xFF0000)
        .build();
      // message.channel.send(`\`\`\`\n${Object.keys(client.tags.get(message.guild.id)).join("\n")}\n\`\`\``);
      break;
    case "random":
      message.channel.send(client.tags.get(message.guild.id, Object.keys(client.tags.get(message.guild.id)).random()).content);
      break;
    default:
      if (args.length !== 0) {
        if (client.tags.has(message.guild.id, args[0])) {
          message.channel.send(client.tags.get(message.guild.id, `${args[0]}.content`)).catch(e => console.error(e.message, e));
        } else {
          message.reply("this tag doesn't exist!");
        }
      } else {
        message.reply("you need to specify the name of the tag!");
      }
  }
};

exports.aliases = ["t", "tag", "ta"];
