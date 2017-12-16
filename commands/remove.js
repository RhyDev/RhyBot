var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	// Check if input is good, using return statements to avoid 4 nested ifs
	if (!args[0]) {
		msg.channel.send('Please provide an index of a song to remove, to see the queue type "music.queue".');
		return;
	}
	if (server.queue.id.length <= 0) {
		msg.channel.send('Cannot remove from an empty queue.');
		return;
	}

	// Makes things easier
	let index = args[0] - 1;

	// Do the removal
	if (index < server.queue.id.length && index >= 0) {
		let removedSong = {
			id: '',
			title: ''
		};
		removedSong.id = server.queue.id.splice(index, 1);
		removedSong.title = server.queue.title.splice(index, 1);

		msg.channel.send(`Removed \`${removedSong.title}\` from the queue.`);
	} else {
		msg.channel.send(`There are ${server.queue.id.length} item(s) in the queue,
			please specify a song within its range.`);
	}
}

const help = {
	name: 'remove',
	type: 'mus',
	args: ' <index>',
	desc: 'Removes the song at the given index from the queue.'
};

module.exports = {
	run,
	help
};
