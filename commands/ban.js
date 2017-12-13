function run(client, msg, args) {
	// Delete the command message
	msg.delete();

	// Get the permissions of user that sent the message
	if (msg.member.hasPermission('ADMINISTRATOR')) {
		// Get GuildMember object from tag
		let usr = msg.guild.members.find(mem => mem.user.tag === args[0]);

		// Combine space delimited args to one string
		args.splice(0, 1);
		let reason = args.join(' ');

		// Wrap with permission if to block permission errors
		if (!usr.hasPermission('ADMINISTRATOR')) {
			if (reason && usr) {
				msg.channel.send(`Banned ${usr.user} for '${reason}'.`).catch(console.error);
				usr.ban(reason).catch(console.error);
			} else if (usr) {
				msg.channel.send(`Banned ${usr.user}.`).catch(console.error);
				usr.ban().catch(console.error);
			}
		}
	}
}

const help = {
	name: 'ban',
	type: 'mod',
	args: '<user> <reason>',
	desc: 'Requires admin privileges, bans the given user with an optional reason.'
};

module.exports = {
	run,
	help
};
