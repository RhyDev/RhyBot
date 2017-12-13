const Discord = require('discord.js');
var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	if (server.currentSongInfo) {
		msg.channel.send(new Discord.RichEmbed()
			.setAuthor(server.currentSongInfo.channelTitle)
			.setURL(`https://www.youtube.com/channel/${server.currentSongInfo.channelId}`)
			.setThumbnail(server.currentSongInfo.thumbnails.high.url)
			.setColor('RANDOM')
			.setDescription(`[${server.currentSongInfo.title}](${server.currentSongInfo.link})`)
			.addField('**Description**', `${server.currentSongInfo.description}`)
			.setTimestamp());
	} else {
		msg.channel.send('No song currently playing.');
	}
}

const help = {
	name: 'song',
	type: 'mus',
	args: '',
	desc: 'Returns information about the song currently playing.'
};

module.exports = {
	run,
	help
};
