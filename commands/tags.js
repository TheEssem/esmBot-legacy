exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  switch (args[0]) {
    case "add":
      if (args[1] !== undefined) {
        if (client.tags.has(args[1])) {
          message.reply("this tag already exists!");
        } else {
          const tagContent = args.slice(2).join(" ");
          if (tagContent !== undefined) {
            client.tags.set(args[1], { content: tagContent, author: message.author.id });
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
        if (client.tags.has(args[1])) {
          if (client.tags.get(args[1], "author") === message.author.id) {
            client.tags.delete(args[1]);
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
        if (client.tags.has(args[1])) {
          if (client.tags.get(args[1], "author") === message.author.id) {
            const tagContent = args.slice(2).join(" ");
            if (tagContent !== undefined) {
              client.tags.set(args[1], tagContent, "content");
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
        if (client.tags.has(args[0])) {
          message.channel.send(client.tags.get(args[0], "content"));
        } else {
          message.reply("this tag doesn't exist!");
        }
      } else {
        message.reply("you need to specify the name of the tag!");
      }
  }
};
