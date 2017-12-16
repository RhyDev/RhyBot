function run(client, msg, args) {
	if (!isNaN(args[0])) {
		// Get the guild member to get permissions
		if (msg.member.hasPermission('MANAGE_MESSAGES')) {
			let msgCount = parseInt(args[0]);
			// Get the channel logs
			msg.channel.fetchMessages({ limit: 100 })
				.then(messages => {
					let msgArray = messages.array();
					let command = msgArray[0];
					msgArray.shift();

					// Filter the message to specific user
					if (args[1]) {
						msgArray = msgArray.filter(ms => ms.author.tag === args[1]);
					}
					// Limit to the requested number for the command message
					msgArray.length = msgCount;

					// Delete messages
					command.delete().catch(console.error);
					msgArray.map(ms => ms.delete().catch(console.error));
				}).catch(console.error);
		}
	}
}

const help = {
	name: 'prune',
	type: 'mod',
	args: ' <number of messages> <user>',
	desc: 'Requires `Manage Messages` permission, deletes the given number of messages by user or in general.'
};

module.exports = {
	run,
	help
};
