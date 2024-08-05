const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

try {
  const commandFolders = fs.readdirSync('./commands');
  for (const folder of commandFolders) {
	const commandsPath = './' + path.join('./commands', folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = './' + path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
} catch (error) {
  console.error(`Error reading commands directory: ${error}`);
}

try {
	const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = './' + path.join('./events', file);
		const event = require(filePath);
		// setup found events
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}	
} catch (error) {
	console.error(`Error reading events directory: ${error}`);
}

client.login(process.env.DISCORD_TOKEN);