function run(client, msg, args) {
	msg.channel.send(`Response time is \`${Math.round((client.ping + 0.00001) * 100) / 100}ms\`.`);
}

const help = {
	name: 'ping',
	type: 'gen',
	args: '',
	desc: 'Returns response time.',
	ex: ''
};

module.exports = {
	run,
	help
};
