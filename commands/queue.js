var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	// Print queue
	if (server && server.queue.id.length > 0) {
		let string = `\`\`\`css\n[Queue]\n\n`;
		for (let i = 0; i < server.queue.id.length; i++) {
			string += `${i + 1} : ${server.queue.title[i]}\n`;
		}
		string += `\`\`\``;
		msg.channel.send(string);
	} else {
		msg.channel.send('Queue is empty.');
	}
}

const help = {
	name: 'queue',
	type: 'mus',
	args: '',
	desc: 'Returns the music queue.'
};

module.exports = {
	run,
	help
};
