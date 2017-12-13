// Import modules
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const search = require('youtube-search');
const config = require('../config.json');

// Store youtube-search args
const opts = {
	maxResults: 7,
	key: config.ytapi
};

var servers = require('../structures/servers.js');
var users = require('../structures/users.js');

function run(client, msg, args) {
	// Play music function
	function play(connection, message) {
		let server = servers[message.guild.id];

		server.dispatcher = connection.playStream(ytdl(server.queue.id[0], { filter: 'audioonly' }));

		server.queue.id.shift();
		server.queue.title.shift();

		server.dispatcher.on('end', () => {
			if (server.queue.id[0]) {
				play(connection, message);
			} else {
				server.currentSongInfo = undefined;
				connection.disconnect();
			}
		});
	}

	const arg = msg.content.replace(' ', '{#$}').slice(config.prefix.length).trim()
		.split('{#$}');
	arg.shift();

	// Add new users to userlist
	if (!users[msg.author.id]) {
		users[msg.author.id] = {
			lookup: false,
			songs: []
		};
	}

	if (users[msg.author.id].lookup === false) {
		// If there isn't a link (actually just a second arg)
		if (!arg) {
			msg.channel.send('Please include a YouTube link or song name.');
			return;
		}

		// If the user isn't in a voice channel (bot joins user's voice channel)
		if (!msg.member.voiceChannel) {
			msg.channel.send('Please join a voice channel.');
			return;
		}

		// If the queue of servers doesn't exist create it
		if (!servers[msg.guild.id]) {
			servers[msg.guild.id] = {
				queue: {
					id: [],
					title: []
				},
				currentSongInfo: {}
			};
		}

		// Search YouTube with user input
		search(arg, opts, (err, results) => {
			if (err) return console.log(err);

			if (results && results.length > 0) {
				// Populate userlist
				users[msg.author.id] = {
					lookup: true,
					songs: results
				};

				// Print song list
				let string = `\`\`\`css\n[Songs]\n\n`;
				for (let i = 0; i < users[msg.author.id].songs.length; i++) {
					string += `${i + 1} : ${users[msg.author.id].songs[i].title}\n`;
				}
				string += `\`\`\``;
				msg.channel.send(string);
				string = '**To queue a song, type music.play and the index of the song you want to play.**';
				return msg.channel.send(string);
			} else {
				return msg.channel.send('No songs found.');
			}
		});
	} else {
		// Reference the server of the user who sent command
		let server = servers[msg.guild.id];

		// Enqueue the chosen song
		users[msg.author.id].lookup = false;
		let song = users[msg.author.id].songs[arg - 1];
		server.currentSongInfo = song;

		server.queue.id.push(song.id);
		server.queue.title.push(song.title);

		msg.channel.send(new Discord.RichEmbed()
			.setAuthor(msg.author.username, msg.author.avatarURL)
			.setDescription(`Enqueued: \`${song.title}\` to position **${server.queue.id.length}**.`)
			.setThumbnail(song.thumbnails.high.url)
			.setColor('RANDOM')
			.setTimestamp());

		// If bot not in voice channel then join voice channel and play song in queue
		if (!msg.guild.voiceConnection) {
			msg.member.voiceChannel.join().then(connection => {
				play(connection, msg);
			}).catch(console.error);
		}
	}
}

const help = {
	name: 'play',
	type: 'mus',
	args: '<title | link>',
	desc: 'Plays the given link or searches YouTube for the song and displays results, then plays the selected song.'
};

module.exports = {
	run,
	help
};
