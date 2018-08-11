// check if using node 8 or higher
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapSQLite = require("enmap-sqlite");
const client = new Discord.Client();
const DBL = require("dblposter");

client.config = require("./config.json");
// no the bot doesn't track you, this is just for adding color to the logs
client.logger = require("./util/logger");
require("./modules/functions.js")(client);
// put commands into collections
client.commands = new Enmap();
client.settings = new Enmap({ provider: new EnmapSQLite({ name: "settings" }) });
client.defaults = {
  prefix: "&"
};

const init = async () => {
  // load command collection
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // load events
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    const mod = require.cache[require.resolve(`./events/${file}`)];
    delete require.cache[require.resolve(`./events/${file}`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }

  });

  // login
  client.login(client.config.token);

  // post info to discordbots.org
  const dbl = new DBL(client.config.dblToken, client);
  dbl.bind();
};

init().catch(error => { throw new Error(error); });
