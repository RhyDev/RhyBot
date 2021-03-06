var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	// Print queue
	if (server && server.queue.songs.length > 0) {
		let string = `\`\`\`css\n[Queue]\n\n`;
		for (let i = 0; i < server.queue.songs.length; i++) {
			string += `${i + 1} : ${server.queue.songs[i].title}\n`;
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
	desc: 'Returns the music queue.',
	ex: ''
};

module.exports = {
	run,
	help
};
