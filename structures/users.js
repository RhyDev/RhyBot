var Users = module.exports = {
	lookup: false,
	songs: [],

	setLookup(msg, val) {
		Users[msg.author.id].lookup = val;
	},
	setSongs(msg, results) {
		Users[msg.author.id].songs = results;
	}
};
