var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	server.dispatcher.resume();
}

const help = {
	name: 'resume',
	type: 'mus',
	args: '',
	desc: 'Resumes the paused song.',
	ex: ''
};

module.exports = {
	run,
	help
};
