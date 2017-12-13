var servers = require('../structures/servers.js');

function run(client, msg, args) {
	// Reference the server of the user who sent command
	let server = servers[msg.guild.id];

	if (server.queue.id.length > 0) {
		// Create a copy of the current queue
		let tempQueue = {
			id: [],
			title: []
		};
		tempQueue.id = server.queue.id.slice();
		tempQueue.title = server.queue.title.slice();

		// Create empty queue to place IDs and titles into
		let newQueue = {
			id: [],
			title: []
		};

		// Magic
		for (let i = 0; i < server.queue.id.length; i++) {
			let rand = Math.round(Math.random() * (tempQueue.id.length - 1));
			newQueue.id[i] = tempQueue.id[rand];
			newQueue.title[i] = tempQueue.title[rand];
			tempQueue.id.splice(rand, 1);
			tempQueue.title.splice(rand, 1);
		}

		// Copy over shuffled queue
		server.queue.id = newQueue.id.slice();
		server.queue.title = newQueue.title.slice();

		// Print the new queue
		let string = `\`\`\`css\n[Queue]\n\n`;
		for (let i = 0; i < server.queue.id.length; i++) {
			string += `${i + 1} : ${server.queue.title[i]}\n`;
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
	desc: 'Randomizes the order of songs in the queue.'
};

module.exports = {
	run,
	help
};
