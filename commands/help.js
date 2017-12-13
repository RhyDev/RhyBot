const Discord = require('discord.js');
const config = require('../config.json');

function run(client, msg, args) {
	// A console.log(client.commands);
	const embed = new Discord.RichEmbed()
		.setAuthor(`${client.user.username} Commands`, client.user.avatarURL)
		.setDescription('Developed with <3 by Rhy.\n ')
		.setColor('GREEN')
		.setFooter('v0.0.1 Beta');

	const cmds = client.commands;
	cmds.forEach(cmd => {
		embed.addField(`**${config.prefix + cmd.help.name}**`, `${cmd.help.desc}`);
	});
	// A console.log(cmds);
	if (args !== 'dm') {
		msg.channel.send(embed);
	} else {
		msg.author.createDM().then(channel => {
			channel.send(embed);
		});
	}
}

const help = {
	name: 'help',
	type: 'gen',
	args: '',
	desc: 'Returns command descriptions.'
};

module.exports = {
	run,
	help
};
