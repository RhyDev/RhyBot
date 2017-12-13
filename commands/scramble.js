function run(client, msg, args) {
	// User input vars
	let numTeams = args[0];
	let teamSize = args[1];
	let players = [];
	for (let i = 2; i < args.length; i++) {
		players[i - 2] = args[i];
	}

	// Slice it so JS doesn't just make a reference pointer zzzz
	let tempPlayers = players.slice();

	// Build an empty array to hold randomized teams
	let teams = [];
	for (let i = 0; i < numTeams; i++) {
		teams[i] = [];
	}

	// Randomize teams
	for (let i = 0; i < players.length; i++) {
		let rand = Math.round(Math.random() * (tempPlayers.length - 1));
		for (let j = 0; j < numTeams; j++) {
			if (teams[j].length < teamSize) {
				teams[j][teams[j].length] = tempPlayers[rand];
				tempPlayers.splice(rand, 1);
				break;
			}
		}
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
	args: '<number of teams> <team size> <players>',
	desc: 'Returns randomized teams.'
};

module.exports = {
	run,
	help
};
