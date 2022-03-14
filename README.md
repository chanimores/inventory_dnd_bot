# Inventory Discord Bot

I built this to be used as an inventory keeper for a Dungeons & Dragons game, but you're welcome to use it however you'd like.
The main idea is that it can create characters with inventories full of items. It was just a small 
project done for fun.

If you have questions on installation, feel create a new issue on this repo. 
This code is to run your own bot using the same code; 
as such you will have to set up the discord bot token and run the code yourself to use the bot. Installation for that is below!

For more info on the actual commands, run `dnd!help` after the bot is up and running.

## [LIST OF BOT COMMANDS]
> dnd!ping - Command to make sure I'm online!

> dnd!help - List of commands. Same list as this one, just on discord!

> add!character [character_name] - Adds a new character.

> remove!character [character_name] - Removes that character.

> add!item [character_name] [item_name] [item_price] [item_weight] [#]
Adds that item to that character's inventory with optional number of the item at the end.

> remove!item [character_name] [item_name] [item_price] [item_weight] [#]
Removes that specific item (matched by exact name/price/weight) from that character's inventory. If optional number of item is added to the end, it will instead remove only the specified amount of the item in question.

> display!characters - Displays all current characters.

> display!inventory [character_name] - Display's character's inventory.

> save!characters
Saves the current characters and their inventories to the current_characters.JSON file in ./inventory_saves/. Saving should happen automatically but feel free to use this to make sure.

> load!characters
Loads saved characters and their inventories from the current_characters.JSON file in ./inventory_saves/ to the bot's current memory. Use this before starting a session to pick up where you left off!

> wipe!characters
Removes all current characters and their inventories from current memory. The old current_characters.JSON file is renamed to old_characters.JSON in ./inventory_saved/ in case you want to use it again. This file will get rewritten if this command is ran multiple times though, so be careful!



## Installation 

These instructions will help you get your own instance of the bot running on your computer. The "save files" for characters will be kept in ./inventory_saves/ as a JSON file that can be loaded in.

 ### 1. Grab a copy of this repo. 

If you want to easily update from this repo, install Git ([See this link here for info](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)) and open up a command prompt. Do `cd Documents` or wherever you want this bot's files to live, and write `git clone https://github.com/chanimores/inventory_dnd_bot.git`. This will create a new git repository and will pull down the code for you. 

### 2. Prep code 

This bot relies on Node.js, which executes JavaScript outside of a web browser environment. Basically, we're running it in a command line instead. You'll need it. Get the installer from [here](https://nodejs.org/en/download/] and install it. 

In that Command prompt from earlier, you can `cd inventory_dnd_bot` to go into the folder where all the code is. With node.js installed, type `npm install discord.js@11.6.4`. This will install Discord.js. You should have a new folder titled `node_modules`. 

### 3. Get your own Discord Bot Account

Go to this [guide](https://anidiots.guide/getting-started/getting-started-long-version) (Great guide to get started on making your own bot!) and follow Step 1 to get your own App/Bot account. You should end up with a token. Copy this token, put it in place of the filler text in `config.json` and save. In the `ownerID` put your discord 4-number tag there.

### 4. Run the Bot

To run the bot, open a Command Prompt and navigate to your bot's folder by doing `cd Documents/inventory_dnd_bot`. 

Run `node bot.js`

Your bot should now be online and running! To close it and shut down the bot, do `CTRL + C` in the command line. 

## Usage

After the bot is up, do `dnd!help` to see all the commands. 

You can add characters and add items to those characters. It will save this info to `./inventory_saves/current_characters.JSON/`. If you shut off the bot, you will have to `load!characters` to get back that save into the bot's memory. 

Have any questions? Feel free to send a message. 
