// Simple inventory DND bot. Use dnd!help for command help
// Any questions/need help? Feel free to email me at chani.mores@gmail.com

const Discord = require("discord.js");
const config = require("./config.json");

const inv = require("./characterInvFunctions.js");

const client = new Discord.Client({
	token: config.token,
   	autorun: true
});
 
client.on("ready", () => {
  console.log("Online and ready to go!");
  client.user.setActivity("DND!");
});

var c = 0;

client.on("message", (message) => {
  // Prevent bot self-spam
  if (message.author.bot) return;
 
  // Debug/help functions
  if (message.content.startsWith("dnd!ping")) {
    message.channel.send("pong!");
  } else if (message.content.startsWith("dnd!help")) {
    inv.help(message);
  }

  // Adding/removing characters
  else if (message.content.startsWith("add!character")) {
    inv.addCharacter(message);
  } else if (message.content.startsWith("remove!character")) {
    inv.removeCharacter(message);
  }

  // Adding/removing items
  else if (message.content.startsWith("add!item")) {
    inv.addItemToCharacter(message);
  } else if (message.content.startsWith("remove!item")) {
    inv.removeItemToCharacter(message);
  } 

  // Display functions
  else if (message.content.startsWith("display!inventory")) {
    inv.displayInventory(message);
  } else if (message.content.startsWith("display!characters")) {
    inv.makeDisplayCharacters(message);
  }

  // JSON file functions
  else if (message.content.startsWith("save!characters")) {
    inv.writeToFile(message);
  } else if (message.content.startsWith("load!characters")) {
    inv.readFromFile(message);
  } else if (message.content.startsWith("wipe!characters")) {
    inv.wipeCharacters(message);
  }
});

client.login(config.token);