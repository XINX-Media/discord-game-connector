
class ViewerConnection {
	constructor([commands]) {
		
	}

	connect()
	{
		require('dotenv').config();
		const { Client, Events, GatewayIntentBits } = require('discord.js');
		const { token } = process.env.DISCORD_TOKEN;

		// Create a new client instance
		const client = new Client({ intents: [GatewayIntentBits.Guilds] });

		// When the client is ready, run this code only once
		client.once(Events.ClientReady, readyClient => {
			console.log(`Ready! Logged in as ${readyClient.user.tag}`);
		});

		// Log in to Discord with your client's token
		client.login(token);
	}

	handleMessage()
	{

	}

	sendMessage(channelID, messageContent)
	{
		
	}
}