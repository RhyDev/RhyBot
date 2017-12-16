function run(client, msg, args) {
	// Get the permissions of user that sent the message
	if (msg.member.hasPermission('KICK_MEMBERS')) {
		// Get GuildMember object from tag
		let usr = msg.guild.members.find(mem => mem.user.tag === args[0]);
		let bot = msg.guild.members.find(mem => mem.user.tag === client.user.tag);

		// Combine space delimited args to one string
		args.splice(0, 1);
		let reason = args.join(' ');

		// Wrap with permission if to block permission errors
		if (usr && !usr.hasPermission('KICK_MEMBERS') && bot.hasPermission('KICK_MEMBERS')) {
			// Delete the command message
			msg.delete();
			if (reason) {
				msg.channel.send(`Kicked ${usr.user} for '${reason}'.`);
				usr.kick(reason).catch(console.error);
			} else {
				msg.channel.send(`Kicked ${usr.user}.`);
				usr.kick().catch(console.error);
			}
		}
	}
}

const help = {
	name: 'kick',
	type: 'mod',
	args: ' <user> <reason>',
	desc: 'Requires `Kick Members` permission, kicks the given user with an optional reason.'
};

module.exports = {
	run,
	help
};
