# RhyBot
> Fully modular, multifunctional, self-hosted Discord bot built with the **[Discord.js](https://discord.js.org)** library.

## Commands

### General Commands
| Command | Description |
|---------|-------------|
| `!help` | Returns command descriptions. |
| `!ping` | Returns response time. |
| `!roll <sides>` | Rolls dice. |
| `!scramble <number of teams> <team size> <players>` | Returns randomized teams. |

### Mod Commands
| Command | Description | Permissions |
|---------|-------------|-------------|
| `!ban <user> <reason>` | Bans the given user with an optional reason. | `Ban Members` |
| `!kick <user> <reason>` | Kicks the given user with an optional reason. | `Kick Members` |
| `!unban <user> <reason>` | Unbans the given user with an optional reason. | `Ban Members` |
| `!prune <number of messsages> <user>` | Deletes the given number of messages in general or from a given user. | `Manage Messages` |

### Music Commands
| Command | Description |
|---------|-------------|
| `!play <title/link>` | Plays the given link or searches YouTube for the song and displays results. |
| `!song` | Returns information about the song currently playing. |
| `!queue` | Returns the music queue. |
| `!pause` | Pauses the currently playing song. |
| `!resume` | Resumes the paused song. |
| `!skip` | Plays the next song in the queue. |
| `!stop` | Disconnects the bot from the voice channel and clears the queue. |
| `!remove <index>` | Removes the song at the given index from the queue. |
| `!shuffle` | Randomizes the order of songs in the queue. |

## Setup

### Requirements
Download and install **[Git](https://git-scm.com/downloads)** and **[Node](https://nodejs.org/en/)**.

### Installation
```bash
# Navigate to directory to install bot in
cd C:/Discord
# Download the bot
git clone https://github.com/RhyDev/RhyBot.git
# Enter the bot folder
cd RhyBot
# Install dependencies
npm install
```

### Discord Bot Creation
0. Go to https://discordapp.com/developers/applications/me
1. Click `New App`
2. Name your bot and give it a profile picture
3. Click `Create App`
4. Click `Create a Bot User`
5. Copy the `Client ID` and replace `CLIENT_ID` here https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID&scope=bot
6. Authorize the bot on your server(s)
> Note that this requires `Manage Server` permissions.

### Configuration
Navigate to your bot folder and create a new file `config.json`, the file should be in the same folder as `bot.js`, and paste the following:
```json
{
    "token": "BOT_TOKEN",
    "prefix": "!",
    "ytapi": "YT_API_KEY"
}
```
Replace `BOT_TOKEN` with your *Discord Bot Token* and `YT_API_KEY` with your *YouTube API Key*, refer to the **[Tokens](#tokens)** section below.
You can set `prefix` to whatever phrase you want to trigger bot commands, e.g. **!ban** or **rhy.ban**.

### Running
```bash
# Navigate to bot directory
cd C:/Discord/RhyBot
# Run the bot
node bot.js
```
> If the bot is running successfully, `Logged in as X!` should be logged in the console.

### Updating
```bash
# Navigate to bot directory
cd C:/Discord/RhyBot
# Update the bot
git pull
# Update dependencies
npm update
```

### Creating New Commands
To create a new command, simply create a new JavaScript file in `/commands` with format like `mycommand.js` then paste the following skeleton:
```js
function run(client, msg, args) {

}

const help = {
	name: '',
	type: '',
	args: '',
	desc: ''
};

module.exports = {
	run,
	help
};
```
> Refer to [Discord.js docs](https://discord.js.org/#/docs/main/stable/general/welcome) or other commands for syntax.

## Tokens
*Keep your tokens secret!*

### Discord Bot Token
1. Go to https://discordapp.com/developers/applications/me
2. Select your bot
3. In the Bot window reveal its token

### YouTube API Key
1. Go to https://console.developers.google.com/apis/credentials
2. Click `Create crendentials`
3. Select `API key` from the drop-down menu
> Note that YouTube API calls are limited

## Changelog

### 1.0.1

#### Bug Fixes
- Added FFMPEG files required for bot voice connection
- Changed * dependencies to correct versions to ensure package compatibility
- Changed permission levels for mod commands to reflect each command instead of `ADMINISTRATOR`
- Now checks if bot has permissions for mod commands
- Updated README with command list, fixed formatting errors