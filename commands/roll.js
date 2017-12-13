function run(client, msg, args) {
	let sides = Number(args[0]);
	if (Number.isInteger(sides)) {
		let rand = Math.round((Math.random() * (sides - 1)) + 1);
		msg.channel.send(`${msg.author} rolled a ${rand}!`);
	} else {
		msg.channel.send('Please provide the number of sides on the die.');
	}
}

const help = {
	name: 'roll',
	type: 'gen',
	args: '<sides>',
	desc: 'Rolls dice.'
};

module.exports = {
	run,
	help
};
