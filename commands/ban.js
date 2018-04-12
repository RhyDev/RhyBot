function run(client, msg, args) {
	// Check permissions
	if (!msg.member.hasPermission('BAN_MEMBERS')) {
		return;
	}
	// Get GuildMember object from tag
	let usr = msg.guild.members.find(mem => mem.user.tag === args[0]);
	let bot = msg.guild.members.find(mem => mem.user.tag === client.user.tag);

	// Combine space delimited args to one string
	args.splice(0, 1);
	let reason = args.join(' ');

	// Wrap with permission if to block permission errors
	if (usr && !usr.hasPermission('BAN_MEMBERS') && bot.hasPermission('BAN_MEMBERS')) {
		// Delete the command message
		msg.delete();
		if (reason) {
			msg.channel.send(`Banned ${usr.user} for '${reason}'.`);
			usr.ban(reason).catch(console.error);
		} else {
			msg.channel.send(`Banned ${usr.user}.`);
			usr.ban().catch(console.error);
		}
	}
}

const help = {
	name: 'ban',
	type: 'mod',
	args: '<user> <reason>',
	desc: 'Requires `Ban Members` permission, bans the given user with an optional reason.',
	ex: 'Rudedude#0123 Goodbye'
};

module.exports = {
	run,
	help
};
