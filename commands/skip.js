var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	// Runs end function of play function
	if (server.dispatcher) {
		server.dispatcher.end();
	}
}

const help = {
	name: 'skip',
	type: 'mus',
	args: '',
	desc: 'Plays the next song in the queue.'
};

module.exports = {
	run,
	help
};
