exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  switch (args[0]) {
    case "add":
      if (args[1] !== undefined) {
        if (client.tags.has(message.guild.id, args[1])) {
          message.reply("this tag already exists!");
        } else {
          const tagContent = args.slice(2).join(" ");
          if (tagContent !== undefined) {
            client.tags.set(message.guild.id, { content: tagContent, author: message.author.id }, args[1]);
            message.reply(`the tag \`${args[1]}\` has been added!`);
          } else {
            message.reply("you need to specify the content of the tag!");
          }
        }
      } else {
        message.reply("you need to specify the name of the tag!");
      }
      break;
    case "remove":
      if (args[1] !== undefined) {
        if (client.tags.has(message.guild.id, args[1])) {
          if (client.tags.get(message.guild.id, "author", args[1]) === message.author.id || message.author.id === "198198681982205953") {
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
          if (client.tags.get(message.guild.id, "author", args[1]) === message.author.id || message.author.id === "198198681982205953") {
            const tagContent = args.slice(2).join(" ");
            if (tagContent !== undefined) {
              client.tags.set(message.guild.id, tagContent, `${args[1]}.content`);
              message.reply(`the tag \`${args[1]}\` has been edited!`);
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
