var Servers = module.exports = {
	queue: {
		id: [],
		title: []
	},
	currentSongInfo: {},
	dispatcher: {},

	setDispatcher(msg, val) {
		Servers[msg.author.id].dispatcher = val;
	},
	setCurrentSongInfo(msg, song) {
		Servers[msg.author.id].currentSongInfo = song;
	},
	pushQueue(msg, id, title) {
		Servers[msg.author.id].queue.id.push(id);
		Servers[msg.author.id].queue.title.push(title);
	}
};
