var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	server.dispatcher.pause();
}

const help = {
	name: 'pause',
	type: 'mus',
	args: '',
	desc: 'Pauses the currently playing song.',
	ex: ''
};

module.exports = {
	run,
	help
};
