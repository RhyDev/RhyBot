function run(client, msg, args) {
	if (args.length < 2 || Number.isInteger(args[0]) || Number.isInteger(args[1])) {
		return;
	}

	// User input vars
	let teamSize = args[0];
	let players = [];
	for (let i = 1; i < args.length; i++) {
		players[players.length] = args[i];
	}

	// Get number of teams
	let numTeams = Math.ceil(players.length / teamSize);

	// Slice it so JS doesn't just make a reference pointer zzzz
	let tempPlayers = players.slice();

	// Build an empty array to hold randomized teams
	let teams = [];
	for (let i = 0; i < numTeams; i++) {
		teams[i] = [];
	}

	// Randomize teams
	var playerCount = Math.ceil(players.length / numTeams);
	for (let i = 0; i < numTeams; i++) {
		for (let j = 0; j < playerCount; j++) {
			if (tempPlayers.length > 0) {
				let rand = Math.round(Math.random() * (tempPlayers.length - 1));
				teams[i][teams[i].length] = tempPlayers.splice(rand, 1);
			}
		}
		playerCount = Math.ceil(tempPlayers.length) / (numTeams - (i + 1));
	}

	// Create a string array for the players on each team to simplify output
	let teamsStr = [];
	for (let i = 0; i < teams.length; i++) {
		teamsStr[i] = '';
		for (let j = 0; j < teams[i].length; j++) {
			if (j + 1 < teams[i].length) {
				teamsStr[i] += `${teams[i][j]} `;
			} else {
				teamsStr[i] += `${teams[i][j]}`;
			}
		}
	}

	// Create string for teams output
	let string = `\`\`\`css\n`;
	for (let i = 0; i < teams.length; i++) {
		if (i < teams.length - 1) {
			string += `[Team ${i + 1}]\n${teamsStr[i]}\n\n`;
		} else {
			string += `[Team ${i + 1}]\n${teamsStr[i]}`;
		}
	}
	string += `\`\`\``;

	msg.channel.send(`Randomized ${numTeams} teams with ${players.length} total players.`);
	msg.channel.send(string);
}

const help = {
	name: 'scramble',
	type: 'gen',
	args: '<max team size> <players>',
	desc: 'Returns randomized teams.',
	ex: '2 Mario Luigi Peach Daisy'
};

module.exports = {
	run,
	help
};
