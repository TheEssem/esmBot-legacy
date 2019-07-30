// check if using node 10 or higher
if (process.version.slice(1).split(".")[0] < 10) throw new Error("Node 10.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const client = new Discord.Client();
const DBL = require("dblposter");

client.config = require("./config.json");
// no the bot doesn't track you, this is just for adding color to the logs
client.logger = require("./modules/logger");
require("./modules/functions.js")(client);
// put commands and stuff into collections
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({ name: "settings" });
client.tags = new Enmap({ name: "tags" });
client.defaults = {
  prefix: "&"
};
client.tagDefaults = {
  help: {
    content: "https://essem.space/esmBot/commands.html",
    author: "198198681982205953"
  }
};

const init = async () => {
  // load command collection
  const cmdFiles = await readdir("./commands/");
  client.logger.log("info", `Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // load events
  const evtFiles = await readdir("./events/");
  client.logger.log("info", `Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  // login
  client.login(client.config.token);

  // post info to discordbots.org
  const dbl = new DBL(client.config.dblToken, client);
  dbl.bind();
};

init();

// .catch(error => { throw new Error(error); });
