function run(client, msg, args) {
	// Delete the command message
	msg.delete();

	// Get the permissions of user that sent the message
	if (msg.member.hasPermission('ADMINISTRATOR')) {
		// Get list of banned users, nested promises wooooo
		msg.guild.fetchBans().then(bans => {
			// Get User object from tag
			let usr = bans.find(mem => mem.tag === args[0]);

			// Combine space delimited args to one string
			args.splice(0, 1);
			let reason = args.join(' ');

			if (reason && usr) {
				msg.channel.send(`Unbanned ${usr} for '${reason}'.`);
				msg.guild.unban(usr, reason).catch(console.error);
			} else if (usr) {
				msg.channel.send(`Unbanned ${usr}.`);
				msg.guild.unban(usr).catch(console.error);
			}
		});
	}
}

const help = {
	name: 'unban',
	type: 'mod',
	args: '<user> <reason>',
	desc: 'Requires admin privileges, unbans the given user with an optional reason.'
};

module.exports = {
	run,
	help
};
