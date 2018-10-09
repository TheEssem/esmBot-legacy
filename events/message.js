module.exports = async (client, message) => {
  // requested by saltypepper#1212
  if (message.author.id === "339614400526942218" && message.content === "Welp, there goes KekBot, my only friend... e.e") {
    message.channel.send("shut the heck up <@339614400526942218>");
  }

  // ignore messages from other bots
  if (message.author.bot) return;

  // prefix can be a mention or a set of special characters
  const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
  const guildConf = client.settings.get(message.guild.id) || client.defaults;
  const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : guildConf.prefix;

  // ignore unrelated messages
  if (message.content.indexOf(prefix) !== 0 && message.mentions.has(client.user) !== true && message.content.indexOf("😂") <= -1 && message.guild.id !== "433408970955423765") return;

  // esmServer specific stuff
  if (message.guild.id === "433601545855172609" && message.mentions.has(client.user) === true || message.guild.id === "425800147008487436" && message.mentions.has(client.user) === true || message.guild.id === "322114245632327703" && message.mentions.has(client.user) === true) {
    client.logger.log("[ESM] Reacted to ping");
    message.react(client.emojis.get("433628233783836672"));
  }
  if (message.guild.id === "433601545855172609" && message.content.indexOf("😂") > -1 || message.guild.id === "322114245632327703" && message.content.indexOf("😂") > -1) {
    client.logger.log("Reacted to tears of joy emoji");
    await message.react("🇽");
    await message.react("🇩");
  }
  if (message.channel.id === "434076900160307212" && message.guild.id === "433408970955423765") {
    const generalChannel = client.guilds.get("322114245632327703").channels.get("322114245632327703");
    if (message.attachments.array().length !== 0) {
      generalChannel.send(message.content, {
        files: [message.attachments.array()[0].url]
      });
    } else {
      generalChannel.send(message.content);
    }
  }

  // separate commands and args
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // check if command exists
  const cmd = client.commands.get(`${command}.js`);
  if (!cmd) return;

  // esmBot is scared of dms
  if (!message.guild)
    return message.channel.send("Sorry, but esmBot is not compatible with DMs. Please use me on a server instead.");

  // actually run the command
  client.logger.cmd(`[CMD] ${message.author.username} (${message.author.id}) ran command ${command}`);
  cmd.run(client, message, args);
};
