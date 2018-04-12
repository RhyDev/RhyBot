var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	if (server.queue.id.length > 0) {
		// Create a copy of the current queue
		let tempQueue = { songs: '' };
		tempQueue = server.queue.songs.slice();

		// Create empty queue to place IDs and titles into
		let newQueue = { songs: '' };

		// Magic
		for (let i = 0; i < server.queue.songs.length; i++) {
			let rand = Math.round(Math.random() * (tempQueue.songs.length - 1));
			newQueue.songs[i] = tempQueue.songs[rand];
			tempQueue.songs.splice(rand, 1);
		}

		// Copy over shuffled queue
		server.queue.songs = newQueue.songs.slice();

		// Print the new queue
		let string = `\`\`\`css\n[Queue]\n\n`;
		for (let i = 0; i < server.queue.songs.length; i++) {
			string += `${i + 1} : ${server.queue.songs[i].title}\n`;
		}
		string += `\`\`\``;
		msg.channel.send('**Queue was shuffled.**');
		msg.channel.send(string);
	} else {
		msg.channel.send('Cannot shuffle, the queue is empty.');
	}
}

const help = {
	name: 'shuffle',
	type: 'mus',
	args: '',
	desc: 'Randomizes the order of songs in the queue.',
	ex: ''
};

module.exports = {
	run,
	help
};
