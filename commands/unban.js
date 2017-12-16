function run(client, msg, args) {
	// Get the permissions of user that sent the message
	if (msg.member.hasPermission('BAN_MEMBERS')) {
		// Get list of banned users, nested promises wooooo
		msg.guild.fetchBans().then(bans => {
			// Get User object from tag
			let usr = bans.find(mem => mem.tag === args[0]);
			let bot = msg.guild.members.find(mem => mem.user.tag === client.user.tag);

			// Combine space delimited args to one string
			args.splice(0, 1);
			let reason = args.join(' ');
			if (usr && bot.hasPermission('BAN_MEMBERS')) {
				// Delete the command message
				msg.delete();
				if (reason) {
					msg.channel.send(`Unbanned ${usr} for '${reason}'.`);
					msg.guild.unban(usr, reason).catch(console.error);
				} else {
					msg.channel.send(`Unbanned ${usr}.`);
					msg.guild.unban(usr).catch(console.error);
				}
			}
		});
	}
}

const help = {
	name: 'unban',
	type: 'mod',
	args: ' <user> <reason>',
	desc: 'Requires `Ban Members` permissions, unbans the given user with an optional reason.'
};

module.exports = {
	run,
	help
};
