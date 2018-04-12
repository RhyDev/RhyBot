var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	// Clean current song
	server.currentSongInfo = undefined;

	// Disconnect bot from voice channel
	if (msg.guild.voiceConnection) {
		msg.guild.voiceConnection.disconnect();
	}
}

const help = {
	name: 'stop',
	type: 'mus',
	args: '',
	desc: 'Disconnects bot from the voice channel and clears the queue.',
	ex: ''
};

module.exports = {
	run,
	help
};
