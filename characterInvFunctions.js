const Discord = require("discord.js");
const config = require("./config.json");
const { Client, RichEmbed } = require('discord.js');

module.exports.addCharacter = function (message) {
    addCharacter(message);
}
module.exports.removeCharacter = function (message) {
    removeCharacter(message);
}

module.exports.addItemToCharacter = function (message) {
    addItemToCharacter(message);
}
module.exports.removeItemToCharacter = function (message) {
    removeItemToCharacter(message);
}

module.exports.displayInventory = function (message) {
	displayInventory(message);
}
module.exports.makeDisplayCharacters = function (message) {
	makeDisplayCharacters(message);
}

module.exports.writeToFile = function (message) {
	writeToFile(message);
}
module.exports.readFromFile = function (message) {
	readFromFile(message);
}
module.exports.wipeCharacters = function (message) {
	wipeCharacters(message);
}

module.exports.help = function (message) {
	help(message);
}

class ItemClass {
	constructor(itemName, price, weight, number) {
		this.itemName = itemName;
		this.price = price;
		this.weight = weight;
		this.number = parseInt(number, 10);
	}
}

class InventoryClass {
	constructor() {
		this.items = [];
	}
}

class CharacterClass {
	constructor(name) {
		this.name = name;
		this.inv = new InventoryClass();
	}
}

class CharactersClass {
	constructor() {
		this.characters = [];
	}
}

var chars = new CharactersClass();

function findCharacterIndex(characterName) {
	var index = -1;

	// check that character exists
	for(i = 0; i < chars.characters.length; i++) {
		if (chars.characters[i].name == characterName) {
			index = i;
			break;
		}
	}
	return index;
}

function findItemIndex(characterIndex, item) {
	var index = -1;

	for(i = 0; i < chars.characters[characterIndex].inv.items.length; i++) {
		if ((chars.characters[characterIndex].inv.items[i].itemName == item.itemName) &&
			(chars.characters[characterIndex].inv.items[i].price == item.price) &&
		  	(chars.characters[characterIndex].inv.items[i].weight == item.weight)) {
				index = i;
				break;
		}
	}
	return index;
}

function readFromFile(message) {
	var fs = require('fs');
	fs.readFile('./inventory_saves/current_characters.json', 'utf8', function readFileCallback(err, data){
	    if (err){
	        console.log(err);
	    } else {
	    chars.characters = JSON.parse(data);
	    makeDisplayCharacters(message);
}});
}

function writeToFile(message) {
	myJSON = JSON.stringify(chars.characters);

	var fs = require('fs');
	fs.writeFile('./inventory_saves/current_characters.json', myJSON, 'utf8');
}

function empty() {
	var x = 0;
};

function wipeCharacters(message) {
	chars.characters = [];

	var fs = require('fs');

	fs.rename('./inventory_saves/currentCharacters.json', `./inventory_saves/old_characters.json`, empty());
	
	message.channel.send("Characters removed from current memory. A backup JSON file for them was created in /inventory_saves/.");
}

// add!character [character_name]
function addCharacter(message) {


	var args = message.content.split(" ");

	var index = findCharacterIndex(args[1]);

	if (index != -1) {
		message.channel.send("This character already exists!");
		return;
	}

	chars.characters.push(new CharacterClass(args[1]));
	writeToFile(message);
	makeDisplayCharacters(message);
}

// remove!character [character_name]
function removeCharacter(message) {
	var args = message.content.split(" ");

	var index = findCharacterIndex(args[1]);

	if (index == -1) {
		message.channel.send("No character by the name to remove.");
		return;
	}

	chars.characters.splice(index, 1);
	writeToFile(message);
	makeDisplayCharacters(message);
}

// add!item [character_name] [item_name] [item_price] [item_weight] [number_of_item]
function addItemToCharacter(message) {
	var args = message.content.split(" ");
	var index = findCharacterIndex(args[1]);

	if (index == -1) {
		message.channel.send("Unable to find character!");
		return;
	}

	if (args.length == 6) {
		var itemToAdd = new ItemClass(args[2], args[3], args[4], args[5]);
	} else {
		var itemToAdd = new ItemClass(args[2], args[3], args[4], 1);
	}

	var ExistingItemIndex = findItemIndex(index, itemToAdd);

	if (ExistingItemIndex != -1) {
		chars.characters[index].inv.items[ExistingItemIndex].number++;
	} else {
		chars.characters[index].inv.items.push(itemToAdd);
	}

	writeToFile(message);
	makeDisplayInvMessage(index, args, message);
}

// remove!item [character_name] [item_name] [item_price] [item_weight] [number_of_item]
function removeItemToCharacter(message) {
	var args = message.content.split(" ");
	var index = findCharacterIndex(args[1]);

	if (index == -1) {
		message.channel.send("Unable to find character!");
		return;
	}

	if (args.length == 6) {
		var itemToRemove = new ItemClass(args[2], args[3], args[4], args[5]);
	} else {
		var itemToRemove = new ItemClass(args[2], args[3], args[4], 1);
	}

	var itemToRemoveIndex = findItemIndex(index, itemToRemove);

	if (itemToRemoveIndex == -1) {
		message.channel.send("No matching item could be found.");
		return;
	}

	if (chars.characters[index].inv.items[itemToRemoveIndex].number - args[5] > 0) {
		chars.characters[index].inv.items[itemToRemoveIndex].number = chars.characters[index].inv.items[itemToRemoveIndex].number - args[5];
	} else {
		chars.characters[index].inv.items.splice(itemToRemoveIndex, 1);
	}

	writeToFile(message);
	makeDisplayInvMessage(index, args, message);
}

// display!inventory [character_name]
function displayInventory(message) {
	var args = message.content.split(" ");
	var index = findCharacterIndex(args[1]);

	if (index == -1) {
		message.channel.send("Unable to find character!");
		return;
	}

	makeDisplayInvMessage(index, args, message);
}

function makeDisplayInvMessage(index, args, message) {
	var invContent = "";

	for (i = 0; i < chars.characters[index].inv.items.length; i++) {
		var temp = "\\>"
		if (chars.characters[index].inv.items[i].number > 1) {
			temp = temp + ` x${chars.characters[index].inv.items[i].number} -`;
		}

		temp = temp + ` ${chars.characters[index].inv.items[i].itemName} - \
		${chars.characters[index].inv.items[i].price} gold - \
		${chars.characters[index].inv.items[i].weight} lbs`

		

		invContent = invContent + temp + "\n";
	}

    // https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const embed = new RichEmbed()
      .setTitle(`[${args[1].toUpperCase()}\'S INVENTORY]`)
      .setColor(0xed971f)
      .setDescription(invContent);
    message.channel.send(embed);
}

// display!characters
function makeDisplayCharacters(message) {
	var characterList = "";

	for (i = 0; i < chars.characters.length; i++) {
		var temp = `\\> ${chars.characters[i].name}\n`
		characterList = characterList + temp;
	}

    // https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const embed = new RichEmbed()
      .setTitle(`[CHARACTER LIST]`)
      .setColor(0x514087)
      .setDescription(characterList);
    message.channel.send(embed);
}

function help(message) {
	const embed = new RichEmbed()
      .setTitle(`[LIST OF BOT COMMANDS]`)
      .setColor(0x26802c)
      .setDescription(`\\> **dnd!ping** - Command to make sure I'm online! \n\n \
      	 \\> **dnd!help** - List of commands. This one! \n\n \
      	 \\> **add!character [character_name]** - Adds a new character. \n\n \
      	 \\> **remove!character [character_name]** - Removes that character. \n\n \
      	 \\> **add!item [character_name] [item_name] [item_price] [item_weight] [*#*]** \n \
      	 			Adds that item to that character's inventory with *optional* number of the item at the end. \n \

      	 \\> **remove!item [character_name] [item_name] [item_price] [item_weight] [#]** \n \
      	 			Removes that specific item (matched by exact name/price/weight) from that character's inventory. \
      	 			If *optional* number of item is added to the end, it will instead remove only the specified amount of the item in question.\n \

      	 \\> **display!characters** - Displays all current characters. \n \

      	 \\> **display!inventory [character_name]** - Display's character's inventory. \n \

      	 \\> **save!characters** \n \
      	 			Saves the current characters and their inventories to the current_characters.JSON file in ./inventory_saves/. \
      	 			Saving should happen automatically but feel free to use this to make sure. \n \

      	 \\> **load!characters** \n \
      	 			Loads saved characters and their inventories from the current_characters.JSON file in ./inventory_saves/ to the bot's current memory. \
      	 			Use this before starting a session to pick up where you left off! \n \

      	 \\> **wipe!characters** \n \
      	 			Removes all current characters and their inventories from current memory. \
      	 			The old current_characters.JSON file is renamed to old_characters.JSON in ./inventory_saved/ in case you want to use it again. \
      	 			This file will get rewritten if this command is ran multiple times though, so be careful!`);
    message.channel.send(embed);
}