// Import modules
const config = require('./config.json');
const Discord = require('discord.js');
const fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) {
		console.error();
	}

	let jsFiles = files.filter(file => file.endsWith('.js'));

	jsFiles.forEach(file => {
		let cmd = require(`./commands/${file}`);
		client.commands.set(file.slice(0, -3), cmd);
	});
	console.log(`Loaded ${client.commands.size} commands!`);
});

// Ready event, required for bot to work
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setGame(`@${client.user.username} for help`);
});

// Event listener for msgs
client.on('message', msg => {
	if (msg.mentions.users.has(client.user.id) && (msg.content.match(/help/) || msg.content.match(/commands/))) {
		let cmd = client.commands.get('help');
		if (cmd) {
			cmd.run(client, msg, 'dm');
		}
	}
	if (msg.content.startsWith(config.prefix) && !msg.author.bot && msg.channel.type !== 'dm') {
		// Ignores the prefix, then splits msg by spaces
		const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
		// Separates command from arguments
		const command = args.shift().toLowerCase();

		let cmd = client.commands.get(command);
		if (cmd) {
			cmd.run(client, msg, args);
		}
	}
});

// Log the bot in
client.login(config.token);
