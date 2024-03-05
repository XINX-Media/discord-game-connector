require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');

class ViewerConnection {
	constructor(commands) {
		this.commands = commands;
	}

	connect() {

	}

	handleMessage() {

	}

	sendMessage(message) {

	}
}

class DiscordConnection extends ViewerConnection {
	constructor() {
		super(commands);
	}

	connect() {
		return new Promise((resolve) => {
			const { token } = process.env.DISCORD_TOKEN;

			// Create a new client instance
			this.client = new Client({ intents: [GatewayIntentBits.Guilds] });

			// When the client is ready, run this code only once
			this.client.once(Events.ClientReady, readyClient => {
				console.log(`Ready! Logged in as ${readyClient.user.tag}`);
				resolve();
			});

			// Log in to Discord with your client's token
			this.client.login(token);
		});
	}

	sendMessage(channelID, messageContent) {
		const channel = this.client.channels.cache.get(channelID);
		channel.send(messageContent)
			.then(console.log)
			.catch(console.error);
			/*
			{
				message: "Message text",
				files: [{
					attachment: 'example.file',
					name: 'filename',
					description: 'file description for accessibility'
				}]
			}
			*/
	}
}

const commands =
	[

	];

const discordConnection = new DiscordConnection(commands);
discordConnection.connect().then(() => 
{
	discordConnection.sendMessage(process.env.CHANNEL_ID, 'test');
});