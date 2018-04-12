const Discord = require('discord.js');
const config = require('../config.json');
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('package.json', 'utf8'));

function run(client, msg, args) {
	var numCmds = 0;
	const cmds = client.commands;
	// Help commands
	if ((!args[0] || args[0].toLowerCase() === 'all') && msg.guild) {
		// Help header
		var helpMsg = `To run a command use \`${config.prefix}command\`. For example, \`${config.prefix}ping\`.\n`;
		helpMsg += `For detailed command information use \`${config.prefix}help command\`. For example, \`${config.prefix}help ping\`.\n`;
		helpMsg += `\n__**Available Commands**__\n`;

		// General commands
		helpMsg += `\n__General__\n`;
		numCmds = 0;
		cmds.forEach(cmd => {
			if (cmd.help.type === 'gen') {
				numCmds++;
				helpMsg += `**${cmd.help.name}:** ${cmd.help.desc}\n`;
			}
		});
		if (numCmds === 0) {
			helpMsg = helpMsg.slice(0, helpMsg.length - 13);
			helpMsg += `No commands available on this server.`;
		}

		// Moderation commands
		helpMsg += `\n__Moderation__\n`;
		numCmds = 0;
		cmds.forEach(cmd => {
			if (cmd.help.type === 'mod') {
				numCmds++;
				helpMsg += `**${cmd.help.name}:** ${cmd.help.desc}\n`;
			}
		});
		if (numCmds === 0) {
			helpMsg = helpMsg.slice(0, helpMsg.length - 16);
		}

		// Music commands
		helpMsg += `\n__Music__\n`;
		numCmds = 0;
		cmds.forEach(cmd => {
			if (cmd.help.type === 'mus') {
				numCmds++;
				helpMsg += `**${cmd.help.name}:** ${cmd.help.desc}\n`;
			}
		});
		if (numCmds === 0) {
			helpMsg = helpMsg.slice(0, helpMsg.length - 11);
		}

		// Send the help message in DM
		msg.author.createDM().then(channel => {
			channel.send(helpMsg);
		});
		msg.channel.send(`${msg.author}, information was DMed.`);
	} else if (cmds.get(args[0])) {
		// Help for specific command
		const cmd = cmds.get(args[0]);
		msg.channel.send(new Discord.RichEmbed()
			.addField(`Command: ${cmd.help.name}`, `${cmd.help.desc}`)
			.addField(`❯ Type`, `\`${cmd.help.type}\``)
			.addField(`❯ Format`, `\`${config.prefix + cmd.help.name} ${cmd.help.args}\``)
			.addField(`❯ Examples`, `\`${config.prefix + cmd.help.name} ${cmd.help.ex}\``)
		);
	} else if (!msg.guild) {
		msg.channel.send(`No guild for this bot detected, please send a help message from a Discord channel with this bot.`);
	} else {
		msg.channel.send(`Could not find the specified command. Use \`${config.prefix}help all\` to view all commands.`);
	}
}

const help = {
	name: 'help',
	type: 'gen',
	args: '',
	desc: 'Returns list of all commands or specific command information.',
	ex: 'ping'
};

module.exports = {
	run,
	help
};
