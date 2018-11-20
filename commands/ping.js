exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const pingMessage = await message.channel.send("🏓 Ping?");
  pingMessage.edit(`🏓 Pong! Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
};

exports.aliases = ["pong"];
