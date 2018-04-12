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

function run(client, msg, args) {
	// Play music function
	function play(connection, message) {
		let server = servers[message.guild.id];

		server.dispatcher = connection.playStream(ytdl(server.queue.songs[0].link, { filter: 'audioonly' }));

		server.currentSongInfo = server.queue.songs.shift();

		server.dispatcher.on('end', () => {
			if (server.queue.songs[0]) {
				play(connection, message);
			} else {
				server.currentSongInfo = undefined;
				connection.disconnect();
			}
		});
	}

	const arg = args.join(' ');

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
			queue: { songs: [] },
			currentSongInfo: {}
		};
	}

	// Search YouTube with user input
	search(arg, opts, (err, results) => {
		if (err) return console.log(err);

		if (results && results.length > 0) {
			// Print song list
			let string = `\`\`\`css\n[Songs]\n\n`;
			for (let i = 0; i < results.length; i++) {
				string += `${i + 1} : ${results[i].title}\n`;
			}
			string += `\`\`\``;
			string += `**To queue a song type the index of the song you want to play.**`;
			msg.channel.send(string);
			msg.channel.awaitMessages(num =>
				num.author === msg.author && num >= 1 && Number.isInteger(Number(num)), { max: 1, time: 10000 })
				.then(collected => {
					// Reference the server of the user who sent command
					let server = servers[msg.guild.id];

					// Enqueue the chosen song
					let song = results[collected.first().content - 1];
					server.queue.songs.push(song);

					msg.channel.send(new Discord.RichEmbed()
						.setAuthor(msg.author.username, msg.author.avatarURL)
						.setDescription(`Enqueued: \`${song.title}\` to position **${server.queue.songs.length}**.`)
						.setThumbnail(song.thumbnails.high.url)
						.setColor('RANDOM')
						.setTimestamp());

					// If bot not in voice channel then join voice channel and play song in queue
					if (!msg.guild.voiceConnection) {
						msg.member.voiceChannel.join().then(connection => {
							play(connection, msg);
						}).catch(console.error);
					}
				})
				.catch(console.error);
			return 0;
		} else {
			return msg.channel.send('No songs found.');
		}
	});
}

const help = {
	name: 'play',
	type: 'mus',
	args: '<title/link>',
	desc: 'Plays the given link or searches YouTube for the song and displays results.',
	ex: 'Shooting Stars'
};

module.exports = {
	run,
	help
};
